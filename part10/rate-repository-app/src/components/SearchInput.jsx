import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: "#e1e4e8",
    borderWidth: 1,
    color: "black",
  },
});

const SearchInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search repositories..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
};

export default SearchInput;
