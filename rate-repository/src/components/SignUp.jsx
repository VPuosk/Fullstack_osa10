import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be atleast 1 character long')
    .max(30, 'Username must be atmost 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Username must be atleast 5 character long')
    .max(50, 'Username must be atmost 50 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], `Passwords don't match`)
    .required('Password confirmation is required')
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="usernameField"
        style={styles.inputbox}
        name="username"
        placeholder='Username'
      />
      <FormikTextInput
        testID="passwordField"
        style={styles.inputbox}
        name="password"
        placeholder='Password'
      />
      <FormikTextInput
        testID="passwordConfirmField"
        style={styles.inputbox}
        name="passwordConfirm"
        placeholder='Password confirmation'
      />
      <Pressable
        testID="signUpButton"
        style={styles.signinBox}
        onPress={onSubmit}
      >
        <Text style={styles.signinBox}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />} 
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;