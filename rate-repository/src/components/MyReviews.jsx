import React from "react";
import { View, FlatList,  StyleSheet } from "react-native";
import useUserReviews from "../hooks/useUserReviews";
import theme from "../theme";
import ReviewItem from "./ReviewItem";

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

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewsContainer = ({ data }) => {

  const reviews = data
    ? data.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <ReviewItem review={item} authorized={true}/>}
    />
  );
};

const MyReviews = () => {
  const { authorizedUser } = useUserReviews();
  return (
    <MyReviewsContainer data={authorizedUser}/>
  );
};

export default MyReviews;