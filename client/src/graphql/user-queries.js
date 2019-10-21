import gql from "graphql-tag";

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
