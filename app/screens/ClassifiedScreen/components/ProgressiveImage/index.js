import React from 'react';
import {View, StyleSheet, Animated, ActivityIndicator} from 'react-native';

class ProgressiveImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  placeholderAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    this.setState({isLoading: false});
    Animated.timing(this.placeholderAnimated, {
      toValue: 1,
    }).start();
  };

  onImageLoad = () => {
    if (!this.props.placeholderSource) {
      this.setState({isLoading: false});
    }
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  };

  render() {
    const {
      placeholderSource,
      source,
      style,
      loadingIndicatorSize,
      placeholderBlurRadius,
      ...props
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {this.state.isLoading && (
          <ActivityIndicator
            color="#8EBF37"
            size={loadingIndicatorSize || 'large'}
            style={styles.loading}
          />
        )}
        {placeholderSource && (
          <Animated.Image
            {...props}
            source={placeholderSource}
            style={{
              opacity: this.placeholderAnimated,
              width: style.width,
              height: style.height,
            }}
            onLoad={this.handleThumbnailLoad}
            blurRadius={placeholderBlurRadius || 20}
          />
        )}
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, {opacity: this.imageAnimated}]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#e1e4e8',
    overflow: 'hidden',
  },
});

export default ProgressiveImage;
