import "dotenv/config";
import "./mongo.js";

import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import context from "./utils/context.js";

import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

// Schema and resolvers, now with access to pubsub in context

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Express application

const app = express();

// HTTP Server (for queries and mutations)

const httpServer = createServer(app);

// WebSocket Server (for subscriptions)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});

// Connect GraphQL WebSocket server to our schema and context

useServer(
  {
    schema,
    context,
  },
  wsServer,
);

// Apollo Server, with context that includes pubsub for subscriptions

const server = new ApolloServer({
  schema,
});

// Start Apollo Server

await server.start();

// Apply Apollo middleware to Express app, with context that includes pubsub for subscriptions

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context,
  }),
);

// Start the HTTP server and apply Apollo middleware

httpServer.listen(4000, () => {
  console.log("Server running on port 4000");
});
