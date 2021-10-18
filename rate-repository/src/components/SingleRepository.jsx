
import React from 'react';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id:id, first:1 });

  
  if (!repository) {
    return (
      <View>
        <Text>Data loading...</Text>
      </View>
    );
  }

  const onEndReach = () => {
    fetchMore();
  };
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList 
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} authorized={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem render={true} item={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => onEndReach()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;