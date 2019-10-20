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
