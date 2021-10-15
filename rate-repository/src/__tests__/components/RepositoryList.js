import React from "react";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { render } from '@testing-library/react-native';
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here

      const { getByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      // repository's name, description, language,
      // forks count, stargazers count, rating average,
      // and review count correctly

      // testing first entry
      const resultA = getByTestId('jaredpalmer.formik');
      expect(resultA).toHaveTextContent('jaredpalmer/formik');
      expect(resultA).toHaveTextContent('Build forms in React, without the tears');
      expect(resultA).toHaveTextContent('TypeScript');
      expect(resultA).toHaveTextContent('1.6k');
      expect(resultA).toHaveTextContent('21.9k');
      expect(resultA).toHaveTextContent('88');
      expect(resultA).toHaveTextContent('3');

      // testing second entry
      const resultB = getByTestId('async-library.react-async');
      expect(resultB).toHaveTextContent('async-library/react-async');
      expect(resultB).toHaveTextContent('Flexible promise-based React data loader');
      expect(resultB).toHaveTextContent('JavaScript');
      expect(resultB).toHaveTextContent('69');
      expect(resultB).toHaveTextContent('1.8k');
      expect(resultB).toHaveTextContent('72');
      expect(resultB).toHaveTextContent('3');
    });
  });
});