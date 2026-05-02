import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useRouter } from "expo-router";

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
  const [signIn] = useSignIn();

  const router = useRouter();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log("LOGIN RESULT:", data);

      router.replace("/");
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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
