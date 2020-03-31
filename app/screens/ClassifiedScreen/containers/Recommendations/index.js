// Core
import React, {useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Context
import {ClassifiedContext} from '../../context';

// Components
import ProductCard from '../../components/ProductCard';

const MyRecommendations = () => {
  const {recommendations, loadRecommendations} = useContext(ClassifiedContext);
  const navigation = useNavigation();

  const onPress = useCallback(
    id => {
      navigation.navigate('CategoryActions', {id});
    },
    [navigation],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      loadRecommendations();
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Recommendations</Text>
      {recommendations.isLoading && (
        <ActivityIndicator size="large" color="#8EBF37" style={styles.loader} />
      )}
      {recommendations.error !== '' && (
        <Text style={styles.error}>{recommendations.error}</Text>
      )}
      {!recommendations.isLoading && recommendations.entities.length === 0 && (
        <View style={styles.noResults}>
          <Text>No Recommendations Found...</Text>
        </View>
      )}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={recommendations.entities}
        renderItem={({item}) => (
          <ProductCard product={item} onPress={onPress} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  header: {
    color: '#39405B',
    marginLeft: 3,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  loader: {
    marginTop: 35,
    marginBottom: 35,
  },
  error: {
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
    marginTop: 10,
    marginBottom: 35,
  },
  noResults: {
    marginTop: 20,
    marginBottom: 35,
    fontSize: 15,
    color: '#39405B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyRecommendations;
