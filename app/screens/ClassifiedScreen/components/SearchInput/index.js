// Core
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Container, Icon, Input} from 'native-base';

const SearchInput = ({placeholder, value, onChange}) => {
  return (
    <Container style={styles.container}>
      <Input
        placeholder={placeholder}
        value={value}
        style={styles.input}
        onChangeText={text => onChange && onChange(text)}
      />
      <Icon name="search" style={styles.icon} />
    </Container>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 2,
    paddingRight: 5,
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

export default SearchInput;
