// Core
import React, { useCallback, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Context
import { ClassifiedContext } from '../../context';

// Components
import SetLocation from '../../components/SetLocation';

const TopLocationBar = () => {
  const { currentLocation, dispatch } = useContext(ClassifiedContext);
  const navigation = useNavigation();

  const gotoAlerts = useCallback(() => {
    navigation.navigate('Alerts');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SetLocation value={currentLocation.name}
        placeholder={'Your Location'}
        onChangeLocation={(value) => dispatch({ payload: { currentLocation: value } })}
        style={styles.setLocationBtn}
      />
      <TouchableOpacity onPress={gotoAlerts}>
        <Icon type="FontAwesome" name="bell-o" style={styles.alertsIcon} />
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
  setLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    height: 55,
    backgroundColor: 'transparent',
    width: '82%'
  },
  alertsIcon: {
    color: '#333',
    fontSize: 26,
  },
});

export default TopLocationBar;
