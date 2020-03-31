import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Logo from '../../../components/Logo';

export function useParentNavigation() {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params && route.params.isHome) {
        navigation.dangerouslyGetParent().setOptions({
          headerLeft: () => {
            return <Logo />;
          },
        });
      } else {
        navigation.dangerouslyGetParent().setOptions({
          headerLeft: () => <BackButton navigation={navigation} />,
        });
      }
    });
    return unsubscribe;
  }, [navigation, route]);

  return navigation;
}

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon type="Entypo" name="chevron-thin-left" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {fontSize: 28, color: 'white'},
});
