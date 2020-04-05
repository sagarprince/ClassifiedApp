// Core
import React, { useEffect, useCallback, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Context
import { ClassifiedContext } from '../../context';

// Components
import ProductCard from '../../components/ProductCard';

const MyRecommendations = () => {
  const { recommendations, fetchRecommendations } = useContext(ClassifiedContext);
  const navigation = useNavigation();

  const onPress = useCallback(
    id => {
      // navigation.navigate('CategoryActions', {id});
    },
    [navigation],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      fetchRecommendations();
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Recommendations</Text>
        <TouchableOpacity onPress={() => fetchRecommendations()}>
          {!recommendations.isLoading && recommendations.entities.length > 0 &&
            <Icon type="Feather" name="refresh-cw" style={styles.refreshBtnIcon} ></Icon>}
          {recommendations.isLoading && recommendations.entities.length > 0 &&
            <ActivityIndicator color="#8EBF37" />}
        </TouchableOpacity>
      </View>
      {recommendations.isLoading && recommendations.entities.length === 0 && (
        <ActivityIndicator size="large" color="#8EBF37" style={styles.loader} />
      )}
      {recommendations.error !== '' && (
        <Text style={styles.error}>{recommendations.error}</Text>
      )}
      {!recommendations.isLoading && recommendations.error === '' && recommendations.entities.length === 0 && (
        <View style={styles.noResults}>
          <Text>No Recommendations Listed.</Text>
        </View>
      )}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={recommendations.entities}
        renderItem={({ item }) => (
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
    marginTop: 5,
    marginBottom: 25,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#39405B',
    fontSize: 18,
    fontWeight: '500',
  },
  refreshBtnIcon: {
    color: '#39405B',
    fontSize: 20,
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
