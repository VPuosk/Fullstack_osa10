import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    margin: 10,
    padding: 20,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySorting = ({sort, setSort}) => {
  return(
    <Picker
      style={styles.pickerStyle}
      selectedValue={sort}
      onValueChange={(itemValue) =>
        setSort(itemValue)
      }
    >
      <Picker.Item label="Latest repositories" value='default' />
      <Picker.Item label="Highest rated repositories" value='highest' />
      <Picker.Item label="Lowest rated repositories" value='lowest' />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, sort, setSort }) => {
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
      ListHeaderComponent={<RepositorySorting sort={sort} setSort={setSort}/>}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem render={false} item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState();
  const { repositories } = useRepositories(sorting);

  return <RepositoryListContainer
    repositories={repositories}
    sort={sorting}
    setSort={setSorting}
  />;
};

export default RepositoryList;