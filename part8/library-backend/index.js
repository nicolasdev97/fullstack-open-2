import "dotenv/config";
import "./mongo.js";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import context from "./utils/context.js";

// Creating the Apollo Server

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Starting the server
// Only with the user authentication
// At context

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
});
