import { gql } from "apollo-boost";

export const getUser = gql`
  query Me {
    me {
      _id
      username
      fullName
      email
    }
  }
`;
