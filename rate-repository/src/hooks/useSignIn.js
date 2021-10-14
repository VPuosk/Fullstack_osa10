import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useHistory } from "react-router-native";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username: username,
        password: password
      }
    });
    console.log(data.authorize.accessToken);
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    history.push('/');
    //return data;
  };

  return [signIn, result];
};

export default useSignIn;