import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  
  const {data, loading, refetch, ...result} = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {...variables, includeReviews: true},
  });

  return {
    authorizedUser: data?.authorizedUser,
    loading,
    refetch,
    ...result,
  };
};

export default useUserReviews;