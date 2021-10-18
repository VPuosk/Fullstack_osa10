import React from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import { Link } from 'react-router-native';
import theme from "../theme";
import useRemoveReview from '../hooks/useRemoveReview';

const styles = StyleSheet.create({
  roundedBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  outerContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.repositoryBackground
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.repositoryBackground
  },  
  mainContainer: {
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.repositoryBackground
  },
  secondaryContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.repositoryBackground
  },
  textContainer: {
    backgroundColor: theme.colors.repositoryBackground,
    padding: 5,
  },
  separator: {
    height: 10,
  },
  linkBox: theme.bigbox,
  deleteBox: theme.bigredbox,
});

const AuthorizedReviewItem = ({ review, authorized }) => {
  const [removeReview] = useRemoveReview();

  if (!authorized) {
    return (
      null
    );
  }

  const handleIt = () => {
    Alert.alert(
      "Removing a review",
      "Are you certain?",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await removeReview({ id: review.id });
            } catch (e) {
              console.log(e);
            }
          }
        },
      ]
    );    
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable>
        <Link to={`/Repository/${review.repository.id}`}>
          <Text style={styles.linkBox}>
            Go to repository
          </Text>
        </Link>
      </Pressable>
      <Pressable onPress={() => handleIt()}>
        <View>
          <Text style={styles.deleteBox}>
            Delete review
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const ReviewItemHeader = ({review, authorized}) => {
  if (!authorized) {
    return (
      <View>
        <Text fontWeight="bold">
          {review.user.username}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text fontWeight="bold">
          {review.repository.fullName}
        </Text>
      </View>
    );
  }
};

const ReviewItem = ({ review, authorized }) => {
  const date = new Date(review.createdAt);
  return (
    <View style={styles.outerContainer}> 
      <View style={styles.mainContainer}>
        <View style={styles.roundedBox}>
          <Text>{review.rating}</Text>
        </View>
        <View style={styles.secondaryContainer}>
          {<ReviewItemHeader review={review} authorized={authorized} />}
          <View>
            <Text>
              {`${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>
                {review.text}
            </Text>
          </View>
        </View>
      </View>
      {<AuthorizedReviewItem review={review} authorized={authorized}/>}
    </View>
  );
};

export default ReviewItem;