import { gql } from "apollo-boost";

export const userFragment = gql`
  fragment UserInfo on User {
    id
    email
    type
    ccLast4
  }
`;
