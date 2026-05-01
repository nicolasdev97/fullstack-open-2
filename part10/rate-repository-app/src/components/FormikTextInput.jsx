import React from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import Text from "./Text";
import { useField } from "formik";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    color: "#000",
  },
  inputError: {
    borderColor: "#d73a4a",
  },
  errorText: {
    marginTop: 5,
    color: "#d73a4a",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, style, error && styles.inputError];

  return (
    <NativeTextInput
      style={textInputStyle}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

export default FormikTextInput;
