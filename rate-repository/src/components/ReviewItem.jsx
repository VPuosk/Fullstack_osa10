import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

import theme from "../theme";

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
    margin: 5,
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
});

const ReviewItem = ({ review }) => {
  const date = new Date(review.createdAt);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.roundedBox}>
        <Text>{review.rating}</Text>
      </View>
      <View style={styles.secondaryContainer}>
        <View>
          <Text fontWeight="bold">
            {review.user.username}
          </Text>
        </View>
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
  );
};

export default ReviewItem;