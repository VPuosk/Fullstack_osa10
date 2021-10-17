import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories(
      $direction: OrderDirection,
      $orderby: AllRepositoriesOrderBy
      $keyword: String
    ){
    repositories(orderDirection: $direction, orderBy: $orderby, searchKeyword: $keyword) {
      edges {
        node {
          ...RepositoryDetails 
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZATION = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;