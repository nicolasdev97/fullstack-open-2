const mongoose = require("mongoose");
const app = require("./app");
const config = require("./utils/config");

// Connect to MongoDB

mongoose.connect(config.MONGODB_URI);

// Start the server

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
