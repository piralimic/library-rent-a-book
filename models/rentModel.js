import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book"
  },
  out: {
    type: Date,
    required: true
  },
  in: {
    type: Date
  }
});

const rent = mongoose.model("rent", rentSchema);

export default rent;
