import React from "react";
import { View, Pressable, TextInput } from "react-native";
import Text from "../components/Text";

import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

import { useRouter } from "expo-router";
import useSignIn from "../hooks/useSignIn";

import { validationSchema } from "../utils/validationCreateUser";

const SignUp = () => {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      // Create user
      await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      // Sign in automatically
      await signIn({
        username: values.username,
        password: values.password,
      });

      // Navigate to home
      router.replace("/");
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <View style={{ padding: 15 }}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            value={values.username}
            onChangeText={(value) => setFieldValue("username", value)}
          />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={(value) => setFieldValue("password", value)}
          />

          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
            value={values.passwordConfirmation}
            onChangeText={(value) =>
              setFieldValue("passwordConfirmation", value)
            }
          />

          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: "#0366d6",
              padding: 12,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
