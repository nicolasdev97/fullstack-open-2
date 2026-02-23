const mongoose = require("mongoose");
const config = require("./config");

// Connect to MongoDB

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;
