import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>The sign in view</Text>
    </View>
  );
};

export default SignIn;
