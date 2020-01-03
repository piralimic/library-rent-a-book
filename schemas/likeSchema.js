import { gql } from 'apollo-server';

export default gql`
  type Like {
    isRelevant: Boolean!
    author: User!
    post: Post!
  }

  extend type Query {
    likes: [Like!]!
  }

  extend type Mutation {
    createLike(isRelevant: Boolean!, post: ID!): Like!
    updateLike(isRelevant: Boolean!, post: ID!): Like!
  }
`;
