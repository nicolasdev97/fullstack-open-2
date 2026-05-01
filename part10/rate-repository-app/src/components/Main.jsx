import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <AppBar />
      {children ? children : <RepositoryList />}
    </View>
  );
};

export default Main;
