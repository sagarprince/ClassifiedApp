// Core
import React, { useState, useCallback, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Hooks
import { useFormInput } from '../../hooks';

// Context
import { ClassifiedContext } from '../../context';

// Components
import PlacesAutocompleteModal from '../../components/PlacesAutocompleteModal';

const TopLocationBar = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { currentLocation, dispatch } = useContext(ClassifiedContext);
  const navigation = useNavigation();

  const gotoAlerts = useCallback(() => {
    navigation.navigate('Alerts');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.setLocationBtn} onPress={() => setModalVisible(true)}>
        <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
        {!currentLocation && <Text style={styles.placeholder} numberOfLines={1}>Your Location</Text>}
        <Text style={styles.location} numberOfLines={1}>{currentLocation}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={gotoAlerts}>
        <Icon type="FontAwesome" name="bell-o" style={styles.alertsIcon} />
      </TouchableOpacity>
      <PlacesAutocompleteModal visible={isModalVisible}
        onChangeLocation={(value) => dispatch({ payload: { currentLocation: value.name } })}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f7f7',
    paddingLeft: 10,
    paddingRight: 15,
  },
  setLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    height: 55,
    backgroundColor: 'transparent',
    width: '82%'
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
  alertsIcon: {
    color: '#333',
    fontSize: 26,
  },
});

export default TopLocationBar;
