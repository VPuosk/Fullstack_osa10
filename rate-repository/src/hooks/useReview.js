import { useApolloClient, useMutation } from "@apollo/client";
import { GIVE_REVIEW } from "../graphql/mutations";
import { useHistory } from "react-router-native";

const useReview = () => {
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [mutate, result] = useMutation(GIVE_REVIEW);

  const giveReview = async ({ ownername, rating, repository, reviewText }) => {
    const { data } = await mutate({
      variables: {
        name: ownername,
        repo: repository,
        rate: Number(rating),
        review: reviewText,
      }
    });
    apolloClient.resetStore();
    history.push(`/Repository/${data.createReview.repository.id}`);
  };

  return [giveReview, result];
};

export default useReview;