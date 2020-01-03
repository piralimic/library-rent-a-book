import userSchema from './userSchema';
import postSchema from './postSchema';
import bookSchema from './bookSchema';
import likeSchema from './likeSchema';
import rentSchema from './rentSchema';
import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  enum Stars {
    ONE
    TWO
    THREE
    FOUR
    FIVE
  }
  enum Lang {
    FR
    EN
  }
  scalar Date
`;

export default [linkSchema, userSchema, postSchema, bookSchema, likeSchema, rentSchema];
