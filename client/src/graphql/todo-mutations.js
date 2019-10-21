import gql from "graphql-tag";

export const addTodoMutation = gql`
  mutation AddTodo($input: String!) {
    addTodo(input: $input) {
      todo
      done
      _id
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      isDeleted
      _id
    }
  }
`;
