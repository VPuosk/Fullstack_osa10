import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    
    // ...
  },
  textbox: {
    color: theme.colors.barFont,
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.textbox}>
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;