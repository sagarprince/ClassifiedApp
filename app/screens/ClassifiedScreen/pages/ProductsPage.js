// Core
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container} from 'native-base';
import {useRoute} from '@react-navigation/native';

// Hooks
import {useParentNavigation, useCategory} from '../hooks';

// Components
import ContentView from '../components/ContentView';

export default function ProductsPage() {
  useParentNavigation();
  const route = useRoute();
  const {id, type} = route.params;
  const category = useCategory(id);

  return (
    <Container style={styles.container}>
      <ContentView style={styles.padding}>
        <Text>{category && category.name}</Text>
        <Text>{type === 'buy' ? 'Buy' : 'Rent'} from below products</Text>
      </ContentView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 15,
  },
});
