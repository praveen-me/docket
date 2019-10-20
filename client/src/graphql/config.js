import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({
  uri: "/graphql"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});

export default client;
