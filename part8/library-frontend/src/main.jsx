import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// Configure Apollo Client to connect to the GraphQL server

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
