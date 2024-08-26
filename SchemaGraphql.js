const { gql } = require("graphql-tag")

const typeDefs = gql`
type Query{
getUsers:[User]
getQuotes:[Quote]
user:[User]
}
type Mutation{
createUser(name:String!,email:String!,password:String!):User
loginUser(email:String!,password:String!):Token
logoutUser:String
createQuote(name:String!):Quote
deleteQuote(quoteId:String!):String
updateQuote(quoteId:String!,name:String!):Update

}
type Update{
message:String
}
type Token{
token:String
}

type User{
_id:ID,
name:String,
email:String,
password:String,
quote:[Quote]
}
type Quote{
    _id:ID,
    by:ID,
    name:String
    }
    `
    module.exports={typeDefs};