import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    book: async (parent, { id }, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.findById({ _id: id }).exec();
      return book;
    },
    books: async (parent, args, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const books = await bookModel.find().exec();
      return books;
    },
  },
  Mutation: {
    createBook: async (parent, { title, subtitle, editor, author, format, language, cover, available, stock }, { models: { bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const book = await bookModel.create({ title, subtitle, editor, author, format, language, cover, available, stock });
      return book;
    },
  },
  Book: {
    posts: async ({ id }, args, { models: { postModel } }, info) => {
      const posts = await postModel.find({ book: id }).exec();
      return posts;
    },
  },
};
