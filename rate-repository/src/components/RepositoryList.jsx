import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
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
    sortingLabelID: 'default',
    orderby: 'CREATED_AT',
    direction: 'DESC'
  },
  highestRated: {
    sortingLabelID: 'highest',
    orderby: 'RATING_AVERAGE',
    direction: 'DESC'
  },
  lowestRated: {
    sortingLabelID: 'lowest',
    orderby: 'RATING_AVERAGE',
    direction: 'ASC'
  }
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySorting = ({sort, setSort, search, setSearch}) => {

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  return(
    <>
      <View style={styles.pickerStyle}>
        <TextInput 
          style={styles.searchBar}
          testID='searchField'
          name='searchField'
          value={search}
          onChangeText={handleSearchChange}
        />
      </View>
      <SelectPicker
        style={styles.pickerStyle}
        selectedValue={sort.sortingLabelID}
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
        <SelectPicker.Item label="Latest repositories" value='default'/>
        <SelectPicker.Item label="Highest rated repositories" value='highest'/>
        <SelectPicker.Item label="Lowest rated repositories" value='lowest'/>
      </SelectPicker>
    </>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  sort,
  setSort,
  search,
  setSearch
}) => {
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
    <View style={{flex: 1, padding: 3}}>
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
        onEndReached={() => onEndReach()}
        /*onEndReached={({ distanceFromEnd }) => {
          console.log(distanceFromEnd);
          if (distanceFromEnd < 0) return;
          onEndReach();
        }}*/
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState(repositoryModes.latest);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 1000);
  const { repositories, fetchMore } = useRepositories({
    test: search,
    keyword: debouncedSearch,
    first: 8,
    ...sorting
  });

  const onEndReach = () => {
    //console.log('End is reached');
    fetchMore();
  };

  return <RepositoryListContainer
    repositories={repositories}
    onEndReach={onEndReach}
    sort={sorting}
    setSort={setSorting}
    search={search}
    setSearch={setSearch}
  />;
};

export default RepositoryList;