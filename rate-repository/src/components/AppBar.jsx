import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    display: 'flex',
    flexDirection: 'row',
    
    // ...
  },
  textbox: {
    color: theme.colors.barFont,
    padding: 10
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/">
            <Text style={styles.textbox}>
              Repositories
            </Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/SignIn">
            <Text style={styles.textbox}>
              Sign in
            </Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;