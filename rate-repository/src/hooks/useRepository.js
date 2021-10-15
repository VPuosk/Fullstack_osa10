import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const {loading, error, data} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id,
    }
  });

  if (error) return `Error: ${error}`;

  if(loading) {
    return ( null, loading );
  }
  
  const repository = data.repository;

  return { repository , loading };
};

export default useRepository;