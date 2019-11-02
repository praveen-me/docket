const { ApolloServer } = require("apollo-server-express");
const { buildContext } = require("graphql-passport");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const { AuthenticationDirective } = require("./directives");
const jwt = require("jsonwebtoken");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    authenticated: AuthenticationDirective
  },
  context({ req, res }) {
    const { authorization } = req.headers;

    let currentUser = null;

    if (authorization) {
      try {
        const user = jwt.verify(authorization, process.env.JWT_SECRET);
        currentUser = user.payload;
      } catch (e) {
        currentUser = null;
      }
    }

    return buildContext({ req, res, currentUser });
  },
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: "production"
  }
});

module.exports = server;
