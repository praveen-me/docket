const { gql } = require("apollo-server-express");

module.exports = gql`
  directive @authenticated on FIELD_DEFINITION

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
    _id: ID!
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

  type DeleteTodo {
    isDeleted: Boolean
    _id: ID!
  }

  input ToggleTodoDoneInput {
    id: ID!
    lastValue: Boolean!
  }

  type Mutation {
    signin(input: SignInInput!): AuthUser!
    signup(input: SignUpInput!): User!
    addTodo(input: String!): Todo! @authenticated
    deleteTodo(id: ID!): DeleteTodo! @authenticated
    toggleTodoDone(input: ToggleTodoDoneInput!): Todo! @authenticated
  }

  type Query {
    me: User! @authenticated
    todos: [Todo]! @authenticated
  }
`;
