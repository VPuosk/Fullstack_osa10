import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = ( sorting, search ) => {
  
  let sortvariables = {
    'orderby': 'CREATED_AT',
    'direction': 'DESC'
  };

  if (sorting) {
    if (sorting ==='highest'){
      sortvariables= {
        'orderby': 'RATING_AVERAGE',
        'direction': 'DESC'
      };
    } else if (sorting ==='lowest') {
      sortvariables= {
        'orderby': 'RATING_AVERAGE',
        'direction': 'ASC'
      };
    }
  }

  if (search) {
    sortvariables = {...sortvariables, 'keyword': search};
  }


  const {loading, error, data} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables:  sortvariables
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