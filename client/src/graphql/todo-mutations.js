import gql from "graphql-tag";

const todoFragment = gql`
  fragment TodoFragment on Todo {
    todo
    done
    _id
  }
`;

export const addTodoMutation = gql`
  mutation AddTodo($input: String!) {
    addTodo(input: $input) {
      ...TodoFragment
    }
  }
  ${todoFragment}
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      isDeleted
      _id
    }
  }
`;

export const TOGGLE_TODO_DONE = gql`
  mutation ToggleTodoDone($input: ToggleTodoDoneInput!) {
    toggleTodoDone(input: $input) {
      ...TodoFragment
    }
  }
  ${todoFragment}
`;
