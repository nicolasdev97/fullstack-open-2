import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import client from "../src/apolloClient";

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ApolloProvider>
  );
}
