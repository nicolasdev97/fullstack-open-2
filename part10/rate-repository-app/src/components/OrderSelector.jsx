import React from "react";
import { Picker } from "@react-native-picker/picker";

const OrderSelector = ({ order, setOrder }) => {
  return (
    <Picker selectedValue={order} onValueChange={(value) => setOrder(value)}>
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST" />
    </Picker>
  );
};

export default OrderSelector;
