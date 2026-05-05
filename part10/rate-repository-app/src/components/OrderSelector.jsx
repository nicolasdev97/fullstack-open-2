import React from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

const data = [
  { label: "Latest repositories", value: "LATEST" },
  { label: "Highest rated repositories", value: "HIGHEST" },
  { label: "Lowest rated repositories", value: "LOWEST" },
];

const OrderSelector = ({ order, setOrder }) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select order"
        value={order}
        onChange={(item) => {
          setOrder(item.value);
        }}
      />
    </View>
  );
};

export default OrderSelector;
