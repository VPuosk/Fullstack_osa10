
import React from 'react';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  roundedBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  mainContainer: {
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.repositoryBackground
  },
  secondaryContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.repositoryBackground
  },
  textContainer: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 5,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  //console.log(review);
  const date = new Date(review.createdAt);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.roundedBox}>
        <Text>{review.rating}</Text>
      </View>
      <View style={styles.secondaryContainer}>
        <View>
          <Text fontWeight="bold">
            {review.user.username}
          </Text>
        </View>
        <View>
          <Text>
            {`${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text>
              {review.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    //console.log('review end reached');
  };

  //console.log(repository);
  //console.log(repository.reviews.edges.map(edge => edge.node));
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList 
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem render={true} item={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => onEndReach()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;