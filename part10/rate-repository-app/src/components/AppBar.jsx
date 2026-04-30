import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 15,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.tab}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" />
    </View>
  );
};

export default AppBar;
