import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const styles = StyleSheet.create({
  inputbox: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 10,
    margin: 5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1
  },
  errorInputBox: {
    borderColor: 'red'
  },
  signinBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.languageBackground,
    color: theme.colors.barFont,
    padding: 10,
    margin: 5
  },
}); 

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput style={styles.inputbox} name="username" placeholder='Username' />
      <FormikTextInput style={styles.inputbox} name="password" placeholder='Password' secureTextEntry={true} />
      <Pressable style={styles.signinBox} onPress={onSubmit}>
        <Text style={styles.signinBox}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />} 
    </Formik>
  );
};

export default SignIn;