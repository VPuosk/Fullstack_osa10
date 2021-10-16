import React from "react";
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useReview from "../hooks/useReview";

const initialValues = {
  ownername: '',
  repository: '',
  rating: '',
  reviewText: '',
};

const validationSchema = yup.object().shape({
  ownername: yup
    .string()
    .required(`Repository's owner is required`),
  repository: yup
    .string()
    .required('Name of the repository required'),
  rating: yup
    .number()
    .min(0, 'Rating can not be lower than 0')
    .max(100, 'Rating can not be higher than 100')
    .required('Rating is required'),
  reviewText: yup
    .string()
    .optional()
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
  pressBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.languageBackground,
    color: theme.colors.barFont,
    padding: 10,
    margin: 5
  },
}); 

const ReviewForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput
        testID="ownernameField"
        style={styles.inputbox}
        name="ownername"
        placeholder={`Repository's owner`}
      />
      <FormikTextInput
        testID="repositoryField"
        style={styles.inputbox}
        name="repository"
        placeholder={`Repository's name`}
      />
      <FormikTextInput
        testID="ratingField"
        style={styles.inputbox}
        name="rating"
        placeholder='Rating between 0 and 100'
        keyboardType='numeric'
      />
      <FormikTextInput
        testID="reviewField"
        style={styles.inputbox}
        name="reviewText"
        placeholder='Review'
        multiline={true}
        numberOfLines='5'
        textAlignVertical='top'
      />
      <Pressable
        testID="reviewButton"
        style={styles.pressBox}
        onPress={onSubmit}
      >
        <Text style={styles.pressBox}>
          Save the review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />} 
    </Formik>
  );
};

const Review = () => {
  const [ review ] = useReview();

  const onSubmit = async (values) => {
    //console.log(values);
    const { ownername, rating, repository, reviewText } = values;

    try {
      await review({ ownername, rating, repository, reviewText });
      //console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewContainer onSubmit={onSubmit} />
  );
};

export default Review;