// Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

// Components
import PlacesAutocompleteModal from '../PlacesAutocompleteModal';

const SetLocation = ({ type, value, placeholder, onChangeLocation, style }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <React.Fragment>
      <TouchableOpacity style={[styles.setLocationBtn, { ...style }]} onPress={() => setModalVisible(true)}>
        <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
        {!value && <Text style={styles.placeholder} numberOfLines={1}>{placeholder}</Text>}
        <Text style={styles.location} numberOfLines={1}>{value}</Text>
      </TouchableOpacity>
      <PlacesAutocompleteModal type={type}
        visible={isModalVisible}
        onChangeLocation={onChangeLocation}
        onClose={() => setModalVisible(false)}
      />
    </React.Fragment>
  );
};

SetLocation.defaultProps = {
  value: '',
  placeholder: 'Set Location'
};

SetLocation.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChangeLocation: PropTypes.func,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  setLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  placeholder: {
    marginLeft: 5,
    fontSize: 16,
    color: '#acacac'
  },
  location: {
    marginLeft: 5,
    paddingRight: 10,
    fontSize: 16,
    color: '#444',
  },
  locationIcon: {
    fontSize: 24,
    color: '#8EBF37',
  },
});

export default React.memo(SetLocation);
