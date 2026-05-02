import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
