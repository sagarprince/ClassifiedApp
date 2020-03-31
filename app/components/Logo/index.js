import React from 'react';
import {Image} from 'react-native';

const Logo = ({width = 45, height = 45, marginLeft = 15, style}) => {
  return (
    <Image
      style={[style, {width: width, height: height, marginLeft: marginLeft}]}
      source={require('@Asset/images/logo.png')}
    />
  );
};

export default Logo;
