// Core
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Icon, Toast} from 'native-base';
import ImagePicker from 'react-native-image-picker';
// Components
import ProgressiveImage from '../../components/ProgressiveImage';

const FormImagesInput = props => {
  const {value, limit, errors, onChange, style} = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    value && setImages(value);
  }, [value]);

  const onChanges = useCallback(
    _images => {
      onChange && onChange(_images);
    },
    [onChange],
  );

  const showToast = useCallback((text, type) => {
    Toast.show({text: text, textStyle: {fontSize: 15}, type: type});
  }, []);

  const showImagePicker = useCallback(() => {
    const options = {
      title: 'Select Product Image',
      maxWidth: 600,
      maxHeight: 600,
      quality: 0.8,
      noData: true,
      allowsEditing: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        showToast(response.error.toString(), 'danger');
      } else {
        !response.didCancel &&
          setImages(imgs => {
            const {uri} = response;
            const selectedImage = {
              id:
                Math.random()
                  .toString(36)
                  .substring(2) + new Date().getTime().toString(36),
              uploded: false,
              uri: uri,
            };
            const allImages = [...imgs, selectedImage];
            console.log(allImages);
            // const newAddedImages = allImages.filter(x => x.uploded === false);
            onChanges(allImages);
            return allImages;
          });
      }
    });
  }, [onChanges]);

  const removeImage = useCallback(
    image => {
      if (!image.uploaded) {
      } else {
        // confirmation here
        console.log('CONFIRMATION ', image);
      }
      setImages(imgs => {
        imgs = imgs.filter(item => {
          return item.id !== image.id;
        });
        onChanges(imgs);
        return imgs;
      });
    },
    [onChanges],
  );

  return (
    <View>
      <View style={[styles.grid, {...style}]}>
        {images.map(item => {
          return (
            <View style={styles.imageBox} key={item.id}>
              <ProgressiveImage
                loadingIndicatorSize="small"
                source={{uri: item.uri || item.url}}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => removeImage(item)}>
                <Icon
                  type="Entypo"
                  name="cross"
                  style={styles.removeImageIcon}
                />
              </TouchableOpacity>
            </View>
          );
        })}
        {images.length !== limit && (
          <TouchableOpacity style={styles.addBtn} onPress={showImagePicker}>
            <Icon type="Entypo" name="plus" style={styles.addBtnIcon} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.error}>{errors}</Text>
    </View>
  );
};

FormImagesInput.defaultProps = {
  value: [],
  limit: 3,
};

FormImagesInput.propTypes = {
  value: PropTypes.any,
  limit: PropTypes.number,
  errors: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.any,
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -4,
    marginRight: -4,
  },
  addBtn: {
    width: (width - 48) / 3,
    height: 110,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#8EBF37',
    margin: 4,
  },
  addBtnIcon: {
    color: '#8EBF37',
    fontSize: 35,
  },
  imageBox: {
    width: (width - 48) / 3,
    margin: 4,
    height: 110,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  removeImageBtn: {
    backgroundColor: 'red',
    width: 24,
    height: 24,
    borderRadius: 24,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageIcon: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    marginTop: 5,
    color: '#ED5D02',
    fontSize: 12,
  },
});

export default FormImagesInput;
