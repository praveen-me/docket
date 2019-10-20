import gql from "graphql-tag";

export const SignUpMutation = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(input: $input) {
      fullName
      email
      username
    }
  }
`;

export const SignInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signin(input: $input) {
      token
      user {
        username
        fullName
        _id
        todos {
          todo
          done
        }
      }
    }
  }
`;
