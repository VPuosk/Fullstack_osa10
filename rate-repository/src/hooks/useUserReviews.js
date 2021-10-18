import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  
  const {data, loading, ...result} = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {...variables, includeReviews: true},
  });

  console.log(data);

  return {
    authorizedUser: data?.authorizedUser,
    loading,
    ...result,
  };
};

export default useUserReviews;