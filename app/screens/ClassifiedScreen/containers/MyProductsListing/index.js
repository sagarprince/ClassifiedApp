// Core
import React, {useEffect, useCallback, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {useNavigation} from '@react-navigation/native';

// Context
import {ClassifiedContext} from '../../context';

// Hooks
import {useDimensions} from '../../hooks';

// Components
import ProductCard from '../../components/ProductCard';

const MyProductsListing = ({categoryId}) => {
  const {products, fetchProducts, setProducts} = useContext(ClassifiedContext);
  const navigation = useNavigation();
  const subscription = useRef(null);
  const dimensions = useDimensions();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      subscription.current = fetchProducts({
        categoryId,
      }).subscribe(() => {});
    });
    return () => {
      onDestroy();
      setProducts({entities: [], isLoading: false, error: ''});
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPress = useCallback(productInfo => {
    navigation.navigate('AddEditProduct', {
      id: categoryId,
      productInfo,
      type: 'sell',
      mode: 'edit',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDestroy = () => {
    if (subscription.current) {
      subscription.current.unsubscribe();
    }
  };

  const getColWidth = () => {
    if (dimensions.window.width > 600) {
      return {width: '33%'};
    } else if (dimensions.window.width > 300 && dimensions.window.width < 420) {
      return {width: '50%'};
    }
    return {width: '100%'};
  };

  return (
    <View style={styles.container}>
      {products.isLoading && products.entities.length === 0 && (
        <ActivityIndicator size="large" color="#8EBF37" style={styles.loader} />
      )}
      {products.error !== '' && (
        <Text style={styles.error}>{products.error}</Text>
      )}
      {!products.isLoading &&
        products.error === '' &&
        products.entities.length === 0 && (
          <View style={styles.noResults}>
            <Text>No Products Listed.</Text>
          </View>
        )}
      <Grid style={styles.grid}>
        {products.entities.map(product => {
          return (
            <Col key={product.id} style={[styles.productCol, getColWidth()]}>
              <ProductCard
                product={product}
                showType={true}
                onPress={() => onPress(product)}
              />
            </Col>
          );
        })}
      </Grid>
    </View>
  );
};

MyProductsListing.propTypes = {
  categoryId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  grid: {
    flexWrap: 'wrap',
    marginHorizontal: '-2%',
  },
  loader: {
    marginTop: 35,
    marginBottom: 35,
  },
  productCol: {
    paddingHorizontal: 7,
    paddingBottom: 16,
  },
  error: {
    textAlign: 'center',
    fontSize: 15,
    color: '#ED1D01',
    marginTop: 10,
    marginBottom: 35,
  },
  noResults: {
    marginTop: 20,
    marginBottom: 35,
    fontSize: 15,
    color: '#39405B',
  },
});

export default MyProductsListing;
