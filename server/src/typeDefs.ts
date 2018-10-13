import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    type: String!
    ccLast4: String
  }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createSubcription(source: String!, ccLast4: String!): User
    changeCreditCard(source: String!, ccLast4: String!): User
    cancelSubscription: User
    logout: Boolean!
  }
`;
