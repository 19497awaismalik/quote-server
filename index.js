const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { Connection } = require("./connection");

const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const {typeDefs} =require("./SchemaGraphql");
const {resolvers} =require("./resolver");
const cors=require('cors')
config();
Connection();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection:true,
    
    
})


const corsMiddleware = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your client's domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  };
  

startStandaloneServer(server, { listen: { port: 4000 },
    context:({req,res})=>{
        corsMiddleware(req, res);
    if(req.body.variables.email && req.body.variables.password && req.body.name||
        req.body.variables.email&& req.body.variables.password ){
            return {};
        }
        let token=req.headers.authorization;
       let user= jwt.verify(token,process.env.SECRET_KEY);
       return {_id:user.userId};
},
cors:{
    origin:"http://localhost:5000",
    credential:"include"
}

},)
    .then(({ url }) => {
        console.log(`server ready at ${url}`);
    })