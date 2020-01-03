import { gql } from 'apollo-server';

export default gql`
  type Rent {
    id: ID!
    book: Book!
    user: User!
    out: Date!
    in: Date
  }

  extend type Query {
    rent(id: ID!): Rent!
    rents: [Rent!]!
    archivedRents: [Rent!]!
    activeRents: [Rent!]!
  }

  extend type Mutation {
    createRent(book: ID!): Rent!
    updateRent(id: ID!): Rent!
  }
`;
