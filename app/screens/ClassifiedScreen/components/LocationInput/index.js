// Core
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Container, Icon, Input} from 'native-base';

const LocationInput = ({value, onChange}) => {
  return (
    <Container style={styles.container}>
      <Icon type="Entypo" name="location-pin" style={styles.icon} />
      <Input
        value={value}
        style={styles.input}
        onChangeText={text => onChange && onChange(text)}
      />
    </Container>
  );
};

LocationInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    height: 55,
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 28,
    color: '#8EBF37',
  },
  input: {
    color: '#222',
  },
});

export default LocationInput;
