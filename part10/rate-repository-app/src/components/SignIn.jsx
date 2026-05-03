import React from "react";
import SignInContainer from "./SignInContainer";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
