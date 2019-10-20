const { ApolloServer } = require("apollo-server-express");
const { buildContext } = require("graphql-passport");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    return buildContext({ req, res });
  }
});

module.exports = server;
