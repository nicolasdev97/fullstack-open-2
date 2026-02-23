const app = require("./app");
const config = require("./utils/config");

// Start the server

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
