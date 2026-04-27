import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

// Configure Apollo Client to connect to the GraphQL server

// HTTP (queries y mutations)

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// WebSocket (subscriptions)

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    connectionParams: {
      authorization: `Bearer ${localStorage.getItem("library-user-token")}`,
    },
  }),
);

// Split links, so that we can send data to each link

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // If it's a subscription, use the WebSocket link
  httpLink, // Otherwise, use the HTTP link
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
