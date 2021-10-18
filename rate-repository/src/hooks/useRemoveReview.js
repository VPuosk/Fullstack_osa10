import { useMutation } from "@apollo/client";
import { REMOVE_REVIEW } from "../graphql/mutations";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useRemoveReview = () => {
  const [mutate, result] = useMutation(REMOVE_REVIEW);

  const removeReview = async ({ id }) => {
    await mutate({
      variables: {
        id: id
      },
      refetchQueries: [{
        variables: {
          includeReviews: true,
        },
        query: GET_AUTHORIZED_USER
      }]
    });
  };

  return [removeReview, result];
};

export default useRemoveReview;