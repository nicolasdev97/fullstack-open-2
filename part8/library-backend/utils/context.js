import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Context function for Apollo Server
// It is called for each request
// And can be used to add user authentication

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;

  if (auth && auth.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

    const currentUser = await User.findById(decodedToken.id);

    return { currentUser };
  }

  return {};
};

export default context;
