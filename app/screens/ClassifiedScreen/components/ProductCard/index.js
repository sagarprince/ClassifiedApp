// Core
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import { Text, Icon } from 'native-base';
// Components
import ProgressiveImage from '../ProgressiveImage';

const ProductCard = ({ product, onPress, style }) => {
  const placeholder = 'https://www.preston-ps.vic.edu.au/images/No_Image_Available-1.jpg';
  const photo = product.photos && product.photos.length > 0 ?
    product.photos[0] : {};
  return (
    <TouchableOpacity
      style={[styles.block, { ...style }]}
      onPress={() => onPress && onPress(product.id)}>
      <ProgressiveImage
        loadingIndicatorSize="large"
        placeholderSource={{ uri: photo.thumbUrl || placeholder }}
        source={{ uri: photo.url || placeholder }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.title}</Text>
        <View style={styles.row}>
          <Icon type="FontAwesome" name="inr" style={styles.icon} />
          <Text style={styles.price}>{product.price}</Text>
        </View>
        <View style={styles.row}>
          <Icon type="FontAwesome" name="map-marker" style={styles.icon} />
          <Text style={styles.address} numberOfLines={1}>{product.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductCard.defaultProps = {
  style: {}
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  block: {
    padding: 0,
    width: 200,
    height: 250,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 2,
          height: 4,
        },
      },
    }),
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: 10,
    marginRight: 8,
    fontSize: 16,
    color: '#39405B',
  },
  name: {
    color: '#39405B',
    fontWeight: '500',
    fontSize: 15,
  },
  price: {
    marginTop: 10,
    color: '#39405B',
    fontWeight: '500',
    fontSize: 15,
  },
  address: {
    marginTop: 10,
    color: '#39405B',
    fontWeight: '400',
    fontSize: 15,
    paddingRight: 10,
  },
});

export default ProductCard;
