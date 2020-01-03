import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    likes: async (parent, args, { models: { likeModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const likes = await likeModel.find({ author: me.id }).exec();
      return likes;
    },
  },
  Mutation: {
    createLike: async (parent, { isRelevant, post }, { models: { likeModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const like = await likeModel.create({ isRelevant, post, author: me.id });
      return like;
    },
    updateLike: async (parent, { isRelevant, post }, { models: { likeModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const filter = {post: post, author:me.id };
      const update = {isRelevant: isRelevant};
      const like = await likeModel.findOneAndUpdate(filter, update);
      const updatedLike = await likeModel.findOne(filter);
      return updatedLike;
    },
  },
  Like: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
    post: async ({ post }, args, { models: { postModel } }, info) => {
      const postID = await postModel.findById({ _id: post }).exec();
      return postID;
    }
  }
};
