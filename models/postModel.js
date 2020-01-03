import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book"
  },
  evaluation: {
    type: String
  }
});

const post = mongoose.model("post", postSchema);

export default post;
