import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
  },
  editor: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  posts: {
    type: mongoose.Schema.Types.Array,
    ref: "post"
  },
  stock: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  }
});

const book = mongoose.model("book", bookSchema);

export default book;
