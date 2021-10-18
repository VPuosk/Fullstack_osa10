import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  
  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });

  const handleFetchMore = () => {
    //console.log('TEST');
    //if (!loading) {
    //  console.log(data?.repository);
    //}
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    //console.log('TEST2');

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;