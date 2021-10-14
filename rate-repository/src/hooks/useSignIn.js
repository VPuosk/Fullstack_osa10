import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const a = await mutate({
      variables: {
        username: username,
        password: password
      }
    });
    return a;
  };

  return [signIn, result];
};

export default useSignIn;