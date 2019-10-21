import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      todo
      done
      _id
    }
  }
`;
