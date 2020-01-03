import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  isRelevant: {
    type: Boolean,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }
});

const like = mongoose.model("like", likeSchema);

export default like;
