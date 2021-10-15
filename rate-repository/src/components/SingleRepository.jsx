
import React from 'react';
import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import Text from './Text';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  
  if (!repository) {
    return (
      <View>
        <Text>Data loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <RepositoryItem render={true} item={repository} />
    </View>
  );
};

export default SingleRepository;