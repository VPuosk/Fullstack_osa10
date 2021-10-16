import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    // create new account
    await mutate({
      variables: {
        username: username,
        password: password
      }
    });

    // login
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return [signUp, result];
};

export default useSignUp;