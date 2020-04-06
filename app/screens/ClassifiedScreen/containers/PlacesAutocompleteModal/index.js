// Core
import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Text,
  Icon,
  Item,
  Input,
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';

// Context
import { ClassifiedContext } from '../../context';

// Hooks
import { useFormInput, useDebounce } from '../../hooks';

const PlacesAutocompleteModal = ({
  type,
  visible,
  onChangeLocation,
  onClose,
}) => {
  const {
    userPlaces,
    productFormPlaces,
    setPlaces,
    fetchPlaces,
    fetchForwardGeocode,
    fetchReverseGeocode,
  } = useContext(ClassifiedContext);
  const isModalVisible = useRef(false);
  const [places, setPlacesState] = useState({
    isGPSEnabled: false,
    entities: [],
    searchTerm: '',
    isLoading: false,
    isSelectedLoading: false,
  });
  const [isGPSSearching, setGPSSearching] = useState(false);
  const { value, onChange: setSearchTerm } = useFormInput(
    type === 'global' ? places.searchTerm : '',
  );
  const debouncedSearchTerm = useDebounce(value, 300);
  const subscription = useRef(null);
  const forwardGeocodeSub = useRef(null);
  const reverseGeocodeSub = useRef(null);

  const onModalShow = () => {
    isModalVisible.current = true;
  };

  const onModalWillShow = () => {
    if (type === 'user') {
      setSearchTerm(places.searchTerm);
    }
  };

  const onModalHide = () => {
    isModalVisible.current = false;
    if (type === 'user') {
      setPlaces(type, { searchTerm: value });
    }
    setGPSSearching(false);
    onDestroy();
  };

  useEffect(() => {
    setPlacesState(type === 'user' ? userPlaces : productFormPlaces);
  }, [userPlaces, productFormPlaces]);

  useEffect(() => {
    if (subscription.current) {
      subscription.current.unsubscribe();
    }
    if (debouncedSearchTerm !== places.searchTerm && isModalVisible.current) {
      subscription.current = fetchPlaces(type, debouncedSearchTerm).subscribe();
    }
  }, [debouncedSearchTerm]);

  const onDoneLocation = userLocation => {
    let selected;
    if (userLocation) {
      selected = userLocation;
    } else {
      selected = getPlaceSelected();
    }
    if (selected) {
      onChangeLocation &&
        onChangeLocation({
          name: selected.name,
          lat: selected.lat,
          lng: selected.lng,
        });
    }
    onClose && onClose();
  };

  const getPlaceSelected = () => {
    return places.entities.find(p => p.selected);
  };

  const setPlaceSelected = (item, data) => {
    return places.entities.map(p => {
      if (item && p.id === item.id) {
        p.selected = data ? p.selected : !p.selected;
        if (data) {
          p.lat = data.lat;
          p.lng = data.lng;
        }
      } else {
        p.selected = false;
      }
      return p;
    });
  };

  const onSetPlaceSelection = (item, data) => {
    const entities = setPlaceSelected(item, data);
    setPlaces(type, { isGPSEnabled: false, entities: entities, isSelectedLoading: false });
  };

  const onPlaceSelection = item => {
    if (forwardGeocodeSub.current) {
      forwardGeocodeSub.current.unsubscribe();
    }
    onSetPlaceSelection(item);
    const selected = getPlaceSelected();
    if (selected && selected.lat === '') {
      setPlaces(type, { isSelectedLoading: true });
      forwardGeocodeSub.current = fetchForwardGeocode(selected.name).subscribe(
        data => {
          console.log(selected.name, data);
          onSetPlaceSelection(item, data);
        },
      );
    }
  };

  const isPlaceSelected = () => {
    return getPlaceSelected() ? true : false;
  };

  const getCurrentGeoLocation = () => {
    setGPSSearching(true);
    Geolocation.getCurrentPosition(
      position => {
        const coords = [position.coords.latitude, position.coords.longitude];
        reverseGeocodeSub.current = fetchReverseGeocode(coords).subscribe(
          name => {
            setGPSSearching(false);
            const entities = setPlaceSelected();
            setPlaces(type, { isGPSEnabled: true, entities: entities, isSelectedLoading: false });
            onDoneLocation({
              name,
              lat: coords[0],
              lng: coords[1],
            });
          },
          () => {
            setGPSSearching(false);
            Alert.alert('Error', 'Unable to determined your current location');
          },
        );
      },
      _ => {
        setGPSSearching(false);
        Alert.alert(
          'Error',
          'Unable to find current location, please check your device gps settings.',
        );
      },
      { enableHighAccuracy: false, timeout: 3000, maximumAge: 1000 },
    );
  };

  const setPlaceItemHightlight = item => {
    return { backgroundColor: item.selected ? '#eee' : 'transparent' };
  };

  const SetCurrentLocationRow = () => {
    const active = places.isGPSEnabled ? { backgroundColor: '#eee' } : {};
    const activeIcon = places.isGPSEnabled ? { color: '#8EBF37' } : {};
    console.log(active);
    return (
      <View style={[styles.currentLocation, active]}>
        <TouchableOpacity
          style={styles.currentLocationBtn}
          onPress={() => {
            if (!isGPSSearching) {
              getCurrentGeoLocation();
            }
          }}>
          {!isGPSSearching && (
            <Icon
              type="Feather"
              name="crosshair"
              style={[styles.currentLocationIcon, activeIcon]}
            />
          )}
          {isGPSSearching && (
            <ActivityIndicator
              style={styles.currentLocationLoading}
            />
          )}
          <Text style={styles.currentLocationBtnText}>
            Current Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onDestroy = () => {
    if (subscription.current) {
      subscription.current.unsubscribe();
    }
    if (reverseGeocodeSub.current) {
      reverseGeocodeSub.current.unsubscribe();
    }
  };

  return (
    <Modal
      isVisible={visible}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={() => onClose && onClose()}
      onModalShow={onModalShow}
      onModalWillShow={onModalWillShow}
      onModalHide={onModalHide}
      style={styles.modal}>
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => onClose && onClose()}
              style={styles.backBtn}>
              <Icon
                type="Entypo"
                name="chevron-thin-left"
                style={styles.backIcon}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>Set Location</Title>
          </Body>
          <Right>
            {!places.isSelectedLoading && isPlaceSelected() && (
              <Button
                transparent
                onPress={() => onDoneLocation()}
                style={styles.backBtn}>
                <Icon
                  type="MaterialIcons"
                  name="check"
                  style={styles.doneIcon}
                />
              </Button>
            )}
            {places.isSelectedLoading && (
              <ActivityIndicator size="large" color="#fff" />
            )}
          </Right>
        </Header>
        <View>
          <Item style={styles.searchBox}>
            <Input
              placeholder="Search..."
              value={value}
              onChangeText={setSearchTerm}
              style={styles.searchBoxInput}
            />
            {places.isLoading ? (
              <ActivityIndicator size="small" />
            ) : value !== '' ? (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Icon
                  type="MaterialIcons"
                  name="close"
                  style={styles.clearBtnIcon}
                />
              </TouchableOpacity>
            ) : (
                  <Icon name="search" />
                )}
          </Item>
          <View style={styles.listing}>
            <FlatList
              data={places.entities}
              ListHeaderComponent={() => {
                return <SetCurrentLocationRow />
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={[styles.placeItem, setPlaceItemHightlight(item)]}
                    onPress={() => onPlaceSelection(item)}>
                    <Text style={styles.placeItemText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={styles.placeSeparator} />
              )}
              ListEmptyComponent={() => {
                if (places.error !== '') {
                  return <Text style={styles.error}>{places.error}</Text>;
                }
                return <View />;
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Container>
    </Modal>
  );
};

PlacesAutocompleteModal.defaultProps = {
  visible: false,
};

PlacesAutocompleteModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  header: {
    backgroundColor: '#8EBF37',
  },
  backBtn: {
    marginLeft: 5,
  },
  backIcon: {
    color: 'white',
    fontSize: 24,
  },
  doneIcon: {
    color: 'white',
    fontSize: 26,
  },
  headerTitle: {
    color: 'white',
  },
  container: {
    backgroundColor: 'white',
  },
  searchBox: {
    paddingHorizontal: 10,
  },
  searchBoxInput: {
    fontSize: 16,
  },
  clearBtnIcon: {
    color: '#ED5D02',
    fontSize: 22,
  },
  listing: {
    height: '90%',
  },
  currentLocation: {
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  currentLocationBtnText: {
    color: '#39405B',
    fontSize: 16,
    fontWeight: '400',
  },
  currentLocationIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  currentLocationLoading: {
    marginRight: 10,
  },
  placeItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 15,
  },
  placeSeparator: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  placeItemText: {
    color: '#39405B',
    fontSize: 15,
    fontWeight: '400',
  },
  error: {
    marginVertical: 35,
    textAlign: 'center',
    fontSize: 15,
    color: '#ED1D01',
  },
});

export default React.memo(PlacesAutocompleteModal);
