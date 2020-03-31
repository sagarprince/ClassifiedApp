// Core
import React, {useCallback, useContext} from 'react';
import {StyleSheet, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Context
import {ClassifiedContext} from '../../context';

// Hooks
import {useDimensions} from '../../hooks';

// Components
import CategoryCard from '../../components/CategoryCard';

const Categories = () => {
  const {categories} = useContext(ClassifiedContext);
  const {width} = useDimensions().window;
  const navigation = useNavigation();

  const onPress = useCallback(
    id => {
      navigation.navigate('Category', {id});
    },
    [navigation],
  );

  const setWidth = useCallback(() => {
    return {width: width > 370 ? 100 : 90};
  }, [width]);

  return (
    <View style={styles.container}>
      {categories.map(category => {
        return (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={onPress}
            style={styles.category}
            iconStyle={[styles.icon, setWidth()]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 2,
          height: 4,
        },
      },
    }),
  },
  category: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#f0f0f0',
    width: '33%',
    height: 160,
  },
  icon: {
    height: 100,
  },
});

export default Categories;
