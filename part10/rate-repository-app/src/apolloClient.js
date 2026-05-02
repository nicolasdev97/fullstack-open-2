import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";

const client = new ApolloClient({
  link: new HttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  }),
  cache: new InMemoryCache(),
});

export default client;
