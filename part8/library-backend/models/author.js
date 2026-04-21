import mongoose from "mongoose";

// Author model for mongodb

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
  },
  born: Number,
});

export default mongoose.model("Author", schema);
