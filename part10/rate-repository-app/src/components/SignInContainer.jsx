import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={{ username: "", password: "" }} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput
            name="username"
            placeholder="Username"
            testID="usernameField"
          />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            testID="passwordField"
          />

          <Button
            title="Sign in"
            onPress={handleSubmit}
            testID="submitButton"
          />
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;
