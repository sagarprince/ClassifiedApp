// Core
import React, {useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Hooks
import {useFormInput} from '../../hooks';

// Components
import LocationInput from '../../components/LocationInput';

const TopLocationBar = () => {
  const {value: location, onChange: setLocation} = useFormInput(
    'Pune, Maharashtra',
  );
  const navigation = useNavigation();

  const gotoAlerts = useCallback(() => {
    navigation.navigate('Alerts');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LocationInput value={location} onChange={setLocation} />
      <TouchableOpacity onPress={gotoAlerts}>
        <Icon type="FontAwesome" name="bell-o" style={styles.icon} />
      </TouchableOpacity>
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
  icon: {
    color: '#333',
    fontSize: 26,
  },
});

export default TopLocationBar;
