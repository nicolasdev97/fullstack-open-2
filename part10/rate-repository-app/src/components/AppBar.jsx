import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "expo-router";
import { useQuery, useApolloClient } from "@apollo/client";
import { useContext } from "react";
import { GET_ME } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  scroll: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBarTab = ({ text, href }) => {
  return (
    <Link href={href} style={styles.tab}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    // Delete the access token from storage
    await authStorage.removeAccessToken();

    // Reset the Apollo Client store to clear any cached data and ensure the app reflects the signed-out state
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab text="Repositories" href="/" />
        {data?.me ? (
          <Pressable onPress={handleSignOut}>
            <View style={styles.tab}>
              <Text style={styles.text}>Sign out</Text>
            </View>
          </Pressable>
        ) : (
          <AppBarTab text="Sign in" href="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
