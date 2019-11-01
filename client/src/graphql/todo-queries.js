import { gql } from "apollo-boost";

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      todo
      done
      _id
    }
  }
`;
