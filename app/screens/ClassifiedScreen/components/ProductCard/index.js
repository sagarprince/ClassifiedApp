// Core
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import {Text, Icon} from 'native-base';
// Constants
import {frequencyOptions} from '../../constants';
// Components
import ProgressiveImage from '../ProgressiveImage';

const ProductCard = ({product, onPress, showType, style}) => {
  const placeholder =
    'https://www.preston-ps.vic.edu.au/images/No_Image_Available-1.jpg';
  const photo =
    product.photos && product.photos.length > 0 ? product.photos[0] : {};
  const frequency = frequencyOptions.find((option) => option.value === product.frequency);
  
  return (
    <TouchableOpacity
      style={[styles.block, {...style}]}
      onPress={() => onPress && onPress(product.id)}>
      <View style={styles.blockInner}>
        {showType && <Text style={styles.type}>{product.type.toUpperCase()}</Text>}
        <ProgressiveImage
          loadingIndicatorSize="large"
          placeholderSource={{uri: photo.thumbUrl || placeholder}}
          source={{uri: photo.url || placeholder}}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {product.title}
          </Text>
          <View style={styles.row}>
            <Icon type="FontAwesome" name="inr" style={styles.icon} />
            <Text style={styles.price}>{product.price}</Text>
            {product.type === 'rent' && frequency && <Text style={styles.frequency}>({frequency.label})</Text>}
          </View>
          <View style={styles.row}>
            <Icon type="FontAwesome" name="map-marker" style={styles.icon} />
            <Text style={styles.address} numberOfLines={1}>
              {product.location.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductCard.defaultProps = {
  style: {},
  showType: false
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
    marginHorizontal: 15,
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
  blockInner: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  type: {
    position: 'absolute',
    top: -45,
    left: -45,
    backgroundColor: '#8EBF37',
    color: '#fff',
    width: 100,
    height: 70,
    paddingTop: 54,
    paddingRight: 20,
    transform: [{ rotate: '-45deg'}],
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: 140,
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
  frequency: {
    color: '#39405B',
    fontSize: 14,
    marginLeft: 5,
    marginTop: 10
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
