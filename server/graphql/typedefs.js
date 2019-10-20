const { gql } = require("apollo-server-express");
// const gql = require("graphql-tag");
// directive @formatDate(
//   defaultFormat: String = "mm dd yyyy"
// ) on FIELD_DEFINITION

// directive @authenticated on FIELD_DEFINITION

// directive @authorized(role: Role!) on FIELD_DEFINITION
module.exports = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    todos: [Todo]!
    fullName: String!
  }

  type Todo {
    user: User!
    todo: String!
    done: Boolean!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    username: String!
    fullName: String!
  }

  type Mutation {
    signin(input: SignInInput!): AuthUser!
    signup(input: SignUpInput!): User!
  }

  type Query {
    me: User!
  }
`;
