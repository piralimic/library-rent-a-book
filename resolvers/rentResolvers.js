import { AuthenticationError } from 'apollo-server';

const DATE_DIFF = require('date-diff-js');

export default {
  Query: {
    rent: async (parent, { id }, { models: { rentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rent = await rentModel.findById({ _id: id }).exec();
      return rent;
    },
    rents: async (parent, args, { models: { rentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rents = await rentModel.find({ user: me.id }).exec();
      return rents;
    },
    archivedRents: async (parent, args, { models: { rentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rents = await rentModel.find({ user: me.id, in: {$ne: null} }).exec();
      return rents;
    },
    activeRents: async (parent, args, { models: { rentModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const rents = await rentModel.find({ user: me.id, in: null }).exec();
      return rents;
    },
  },
  Mutation: {
    createRent: async (parent, { book }, { models: { rentModel, userModel, bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const TODAY = Date.now();

      const user = await userModel.findById({ _id: me.id }).exec();

      if(!(user.rentCount < 5)) {
        throw new AuthenticationError('Rent quantity exceeded, please give back at least one book.');
      }

      let diffMonths = 0;

      if(user.rentCount > 0){
        const oldestRent = await rentModel.findById({ _id: user.activeRents[0] }).exec();
        diffMonths = DATE_DIFF(Date.now(), oldestRent.out, 'm').output;
      }

      if(diffMonths > 0) {
        throw new AuthenticationError('Rent duration exceeded, please give back the oldest rented book.');
      }

      const bookRent = await bookModel.findById({ _id: book}).exec();

      if(bookRent.available == 0) {
        throw new AuthenticationError('This book is no more available.');
      }

      const rentCount = user.rentCount + 1;
      const available = bookRent.available - 1;
      await bookModel.findByIdAndUpdate(book, { available });

      const rent = await rentModel.create({ book, out: TODAY, user: me.id });
      await userModel.findByIdAndUpdate(me.id, { $push: { activeRents : rent.id }, rentCount});
      return rent;
    },
    updateRent: async (parent, { id }, { models: { rentModel, userModel, bookModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const TODAY = Date.now();

      const oldestRent = await rentModel.findById({ _id: id }).exec();
      const user = await userModel.findById({ _id: me.id }).exec();
      const rentCount = user.rentCount - 1;
      const bookRent = await bookModel.findById({ _id: oldestRent.book }).exec();
      const available = bookRent.available + 1;
      await bookModel.findByIdAndUpdate(oldestRent.book, { available });

      const rent = await rentModel.findByIdAndUpdate(id, { in: TODAY }, { new: true });
      await userModel.findByIdAndUpdate(me.id, { $pull: { activeRents : id }, rentCount});
      return rent;
    },
  },
  Rent: {
    user: async ({ user }, args, { models: { userModel } }, info) => {
      const userID = await userModel.findById({ _id: user }).exec();
      return userID;
    },
    book: async ({ book }, args, { models: { bookModel } }, info) => {
      const bookID = await bookModel.findById({ _id: book }).exec();
      return bookID;
    }
  }
};
