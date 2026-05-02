import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "../src/apolloClient";
import AuthStorage from "../src/utils/authStorage";
import AuthStorageContext from "../src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function Layout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
