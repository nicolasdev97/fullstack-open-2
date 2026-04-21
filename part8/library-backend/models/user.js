import mongoose from "mongoose";

// User model for mongodb

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteGenre: String,
});

export default mongoose.model("User", schema);
