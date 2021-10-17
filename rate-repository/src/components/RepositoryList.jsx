import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce/lib';
import TextInput from './TextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    margin: 10,
    padding: 10,
  },
  searchBar: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 6,
  }
});

const repositoryModes = {
  latest: {
    orderby: 'CREATED_AT',
    direction: 'DESC'
  },
  highestRated: {
    orderby: 'RATING_AVERAGE',
    direction: 'DESC'
  },
  lowestRated: {
    orderby: 'RATING_AVERAGE',
    direction: 'ASC'
  }
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySorting = ({sort, setSort, search, setSearch}) => {

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return(
    <>
      <View style={styles.pickerStyle}>
        <TextInput 
          style={styles.searchBar}
          testID='searchField'
          name='searchField'
          value={search}
          onChange={handleSearchChange}
        />
      </View>
      <Picker
        style={styles.pickerStyle}
        selectedValue={sort}
        onValueChange={(itemValue) => {
            switch (itemValue) {
              case 'highest':
                setSort(repositoryModes.highestRated);
                break;
              case 'lowest':
                setSort(repositoryModes.lowestRated);
                break;
              default:
                setSort(repositoryModes.latest);
            }
          }
        }
      >
        <Picker.Item label="Latest repositories" value='default'/>
        <Picker.Item label="Highest rated repositories" value='highest'/>
        <Picker.Item label="Lowest rated repositories" value='lowest'/>
      </Picker>
    </>
  );
};

export const RepositoryListContainer = ({ repositories, sort, setSort, search, setSearch }) => {
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
      ListHeaderComponent={
        <RepositorySorting
          sort={sort}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
        />
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem render={false} item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState(repositoryModes.latest);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const { repositories } = useRepositories({
    keyword: debouncedSearch,
    first: 3,
    ...sorting
  });

  return <RepositoryListContainer
    repositories={repositories}
    sort={sorting}
    setSort={setSorting}
    search={search}
    setSearch={setSearch}
  />;
};

export default RepositoryList;