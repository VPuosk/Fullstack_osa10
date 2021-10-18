import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const GIVE_REVIEW = gql`
  mutation GiveReview($name: String!, $repo: String!, $rate: Int!, $review: String) {
    createReview(review: {
      repositoryName: $repo,
      ownerName: $name,
      rating: $rate,
      text: $review
    }) {
      id
      text
      repository {
        id
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!) {
    createUser(user: {
      username: $username,
      password: $password
    }) {
      username
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($id: ID!) {
    deleteReview(id: $id)
  }
`;