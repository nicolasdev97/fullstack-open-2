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

// 🔥 1. Crear schema REAL
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// 🔥 2. Express
const app = express();

// 🔥 3. HTTP server
const httpServer = createServer(app);

// 🔥 4. WebSocket server (IMPORTANTE path)
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// 🔥 5. Conectar GraphQL WS
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx) => {
      const auth = ctx.connectionParams?.authorization;

      return await context({ req: { headers: { authorization: auth } } });
    },
  },
  wsServer,
);

// 🔥 6. Apollo Server
const server = new ApolloServer({
  schema,
});

// 🔥 7. Start Apollo
await server.start();

// 🔥 8. Middleware HTTP
app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context,
  }),
);

// 🔥 9. Start server
httpServer.listen(4000, () => {
  console.log("HTTP: http://localhost:4000/graphql");
  console.log("WS:   ws://localhost:4000/graphql");
});
