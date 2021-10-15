import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.repositoryBackground
  },
  smallImage: {
    width: 60,
    height: 60,
  },
  verticalcontainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.repositoryBackground
  },
  languageBox: {
    //backgroundColor: theme.colors.languageBackground,
    //color: theme.colors.barFont,
    display: 'flex',
    flexGrow: 0,
    textShadowColor: '#33F',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1
  }
});

const renderThousandsToRI = ( oldValue ) => {
  if (oldValue >= 1000) {
    const newCount = (oldValue/1000);
    return (
      <Text fontWeight="bold">
        {newCount.toFixed(1)}k
      </Text>
    );
  } else {
    return (
      <Text fontWeight="bold">
        {oldValue}
      </Text>
    );
  }
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID={item.id} key={item.id} style={styles.verticalcontainer}>
      <View style={styles.container}>
        <Image
          style={styles.smallImage}
          source={{
            uri: item.ownerAvatarUrl
          }}
        />
        <View style={styles.verticalcontainer}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.languageBox}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.verticalcontainer}>
          <Text>{renderThousandsToRI(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.verticalcontainer}>
          <Text>{renderThousandsToRI(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.verticalcontainer}>
          <Text>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.verticalcontainer}>
          <Text>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>        
      </View>
    </View>
  );
};

export default RepositoryItem;