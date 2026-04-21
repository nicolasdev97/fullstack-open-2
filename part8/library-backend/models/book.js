import mongoose from "mongoose";

// Book model for mongodb

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  published: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [String],
});

export default mongoose.model("Book", schema);
