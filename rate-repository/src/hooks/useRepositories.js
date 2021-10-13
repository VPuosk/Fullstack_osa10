import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const {loading, error, data} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) return `Error: ${error}`;

  if(loading) {
    return (null, loading);
  }
  
  const repositories = data.repositories;
  console.log('check');

  return { repositories , loading };
};

export default useRepositories;