import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
//import { useQuery } from '@apollo/client';
//import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

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
  const { authorizedUser } = useAuthorizedUser();
  
  /*const {loading, error, data} = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });
  */

  const signOut = useSignOut();

  const onSignOut = async () => {
    try {
      await signOut();
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const viewPerAuth = () => {
    /*
    if (loading) {
      return (
        null
      );
    }

    if (error) {
      console.log(error);
      return (
        null
      );
    }
    */

    if (!authorizedUser) {
      return (
        <>
          <Pressable>
            <Link to="/SignIn">
              <Text style={styles.textbox}>
                Sign in
              </Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/SignUp">
              <Text style={styles.textbox}>
                Sign up
              </Text>
            </Link>
          </Pressable>
        </>
      );
    } else {
      return (
        <>
          <Pressable>
            <Link to="/Review">
              <Text style={styles.textbox}>
                Give review
              </Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/MyReviews">
              <Text style={styles.textbox}>
                My reviews
              </Text>
            </Link>
          </Pressable>
          <Pressable onPress={onSignOut}>
            <Text style={styles.textbox}>
              Sign out
            </Text>
          </Pressable>
          <View>
            <Text style={styles.textbox}>
              Signed in as {authorizedUser.username}
            </Text>
          </View>
        </>
      );
    }
  };


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
        {viewPerAuth()}
      </ScrollView>
    </View>
  );
};

export default AppBar;