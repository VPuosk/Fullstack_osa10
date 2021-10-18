import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  
  const {data, loading, ...result} = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });

  return {
    authorizedUser: data?.authorizedUser,
    loading,
    ...result,
  };
};

export default useAuthorizedUser;