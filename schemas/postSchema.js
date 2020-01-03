import { gql } from 'apollo-server';

export default gql`
  type Post {
    id: ID!
    title: String
    content: String!
    author: User!
    book: Book!
    evaluation: Stars
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  extend type Mutation {
    createPost(title: String, content: String!, book: ID!, evaluation: Stars): Post!
  }
`;
