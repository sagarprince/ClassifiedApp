// Core
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'native-base';

const CategoryCard = ({category, onPress, style, iconStyle}) => {
  return (
    <TouchableOpacity
      style={style || styles.block}
      onPress={() => onPress && onPress(category.id)}>
      <Image
        source={category.icon}
        resizeMode={'contain'}
        style={iconStyle || styles.icon}
      />
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  block: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    color: '#333',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CategoryCard;
