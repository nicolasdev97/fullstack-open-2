import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 10,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              style={styles.input}
            />

            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />

            <Button title="Sign In" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
