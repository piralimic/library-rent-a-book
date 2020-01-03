import { gql } from 'apollo-server';

export default gql`
  type Book {
    id: ID!
    title: String!
    subtitle: String
    author: String!
    editor: String!
    format: String!
    language: Lang!
    cover: String!
    posts: [Post!]!
    stock: Int!
    available: Int!
  }

  extend type Query {
    book(id: ID!): Book!
    books: [Book!]!
  }

  extend type Mutation {
    createBook(title: String!, subtitle: String, stock: Int!, available: Int!, author: String!, editor: String!, format: String!, language: Lang!, cover: String!): Book!
  }
`;
