// Core
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Icon} from 'native-base';
import {useRoute} from '@react-navigation/native';

// Hooks
import {useParentNavigation, useCategory} from '../hooks';

// Components
import ContentView from '../components/ContentView';
import UserLocationBox from '../containers/UserLocationBox';
import MyProductsListing from '../containers/MyProductsListing';

export default function MyProductsPage() {
  useParentNavigation();
  const route = useRoute();
  const {id} = route.params;
  const category = useCategory(id);
  const categoryName = (category && category.name) || '';
  return (
    <Container style={styles.container}>
      <UserLocationBox />
      <ContentView style={styles.padding}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>My Products</Text>
          <Icon
            type="Entypo"
            name="chevron-small-right"
            style={styles.headingIcon}
          />
          <Text style={styles.headingText}>{categoryName}</Text>
        </View>
        <MyProductsListing categoryId={id} />
      </ContentView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderColor: '#39405B',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingIcon: {
    marginTop: 4,
  },
  headingText: {
    color: '#39405B',
    fontSize: 15,
    fontWeight: '500',
  },
});
