import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "expo-router";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab text="Repositories" href="/" />
        <AppBarTab text="Sign In" href="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
