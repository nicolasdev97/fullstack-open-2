import React from "react";
import SignInContainer from "./SignInContainer";
import useSignIn from "../hooks/useSignIn";
import { useRouter } from "expo-router";

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

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
