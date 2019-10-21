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
