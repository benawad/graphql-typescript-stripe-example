import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    type: String!
    ccLast4: String
  }

  type Book {
    id: ID!
    name: String!
  }

  type Query {
    me: User
  }

  type Subscription {
    newBook: Book!
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    logout: Boolean!
    createBook(name: String!): Book!
  }
`;
