
const bcrypt = require("bcryptjs");

const { User } = require("./models/User")
const { Quote } = require("./models/Quote")
const jwt=require("jsonwebtoken")
const resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find({});
        },
        getQuotes: async (_,__,{_id}) => {
            return await Quote.find({by:_id});
        },
        user: async (_, __,{_id}) => {
            let user = await User.findById({ _id });
            if (!user) {
                throw new Error("User not found")
            }
            return [user];
        }
    },
    Mutation: {
        createUser: async (_, { name, email, password }) => {
            let isUserExist = await User.findOne({ email });
            if (isUserExist) {
                throw new Error("User already exist with that email");
            }
            let hash = await bcrypt.hash(password, 10);

            let user = await User.create({
                name,
                email,
                password: hash
            });
            return user;

        },
        loginUser: async (_, { email, password }) => {
            let isUserExist = await User.findOne({ email });
            if (!isUserExist) {
                throw new Error("Login using valid email and password");
            }
            let comparePassword = bcrypt.compare(password, isUserExist.password);
            if (!comparePassword) {
                throw new Error("Login using valid email and password");
            }
            let id = {
                userId: isUserExist._id
            }
            const token = jwt.sign(id, process.env.SECRET_KEY);
            return { token }
        },
        logoutUser: async (_, __,{_id}) => {

            let isUserExist = await User.findById({ _id });

            if (!isUserExist) {
                throw new Error("User not found");
            }
              
            return "Logout User successfully"

        },
        createQuote: async (_, { name },{_id}) => {
            let quote = new Quote({
                name,
                by:_id
            })
            quote = await quote.save();
            return quote;
        },
        deleteQuote:async(_,{quoteId},{_id})=>{
            let isUserExist = await User.findById({ _id });

            if (!isUserExist) {
                throw new Error("User not found");
            }
            let isQuoteExist=await Quote.findById({_id:quoteId});
            if(!isQuoteExist){
                throw new Error("Quote not found");
            }
            if(isQuoteExist.by.toString()!==_id){
                throw new Error("non authorization access");
            }
            await Quote.findByIdAndDelete({_id:quoteId});
            return "Quote Deleted successfully";
        },
        updateQuote:async(_,{quoteId,name},{_id})=>{
            let isUserExist = await User.findById({ _id });

            if (!isUserExist) {
                throw new Error("User not found");
            }
            let isQuoteExist=await Quote.findById({_id:quoteId});
            if(!isQuoteExist){
                throw new Error("Quote not found");
            }
            // console.log(isQuoteExist.by.toString()===_id)
            if(isQuoteExist.by.toString()!==_id){
                throw new Error("non authorization access");
            }   
            if(isQuoteExist){
                isQuoteExist.name=name;
            }
           await  isQuoteExist.save();
           return {message:"Quote Updated successfully"};
        }
    },
    User: {
        quote: async ({ _id }) => {
            return await Quote.find({ by: _id });
        }
    }
}
module.exports={resolvers}