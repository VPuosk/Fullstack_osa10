import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  
  const repositoryNoodles = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const handlePress = (id) => {
    //console.log("what",id);
    history.push(`/Repository/${id}`);
  };

  //console.log(repositoryNoodles);
  return (
    <FlatList
      data={repositoryNoodles}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem render={false} item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;