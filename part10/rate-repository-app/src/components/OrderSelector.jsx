import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
});

const OrderSelector = ({ order, setOrder }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={order}
        onValueChange={(value) => setOrder(value)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST" />
      </Picker>
    </View>
  );
};

export default OrderSelector;
