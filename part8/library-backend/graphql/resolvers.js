import jwt from "jsonwebtoken";

import { GraphQLError } from "graphql";

import User from "../models/user.js";
import Author from "../models/author.js";
import Book from "../models/book.js";

// Secret key for JWT

const JWT_SECRET = process.env.JWT_SECRET;

// Resolvers
// Functions that are responsible for fetching the data for the queries
// And mutations defined in the schema

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate("author");
      }

      return Book.find({ genres: args.genre }).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      } else {
        try {
          let author = await Author.findOne({ name: args.author });

          if (!author) {
            author = new Author({ name: args.author });
            await author.save();
          }

          const book = new Book({
            title: args.title,
            published: args.published,
            author: author._id,
            genres: args.genres,
          });

          await book.save();

          return book.populate("author");
        } catch (error) {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      } else {
        try {
          const author = await Author.findOne({ name: args.name });

          if (!author) {
            return null;
          }

          author.born = args.setBornTo;

          return await author.save();
        } catch (error) {
          throw new GraphQLError("Editing author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.setBornTo,
              error,
            },
          });
        }
      }
    },
  },
};

export default resolvers;
