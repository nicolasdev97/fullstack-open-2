import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import theme from "../../constants/theme";

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts?.main || "System",
  },
});

const Text = ({ style, ...props }) => {
  return <NativeText style={[styles.text, style]} {...props} />;
};

export default Text;
