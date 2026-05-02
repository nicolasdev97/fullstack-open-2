import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // Execute the sign-in mutation
    const { data } = await mutate({
      variables: { username, password },
    });

    const accessToken = data.authenticate.accessToken;

    // Save the access token in storage
    await authStorage.setAccessToken(accessToken);

    // Reset the Apollo Client store to ensure the new token is used in subsequent requests
    await apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
