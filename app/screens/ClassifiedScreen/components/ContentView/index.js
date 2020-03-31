// Core
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Content} from 'native-base';

const ContentView = ({children, style}) => {
  return <Content style={[styles.container, style]}>{children}</Content>;
};

ContentView.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
  },
});

export default ContentView;
