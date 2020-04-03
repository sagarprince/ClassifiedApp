// Core
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Container, Icon} from 'native-base';
import {useRoute} from '@react-navigation/native';

// Hooks
import {useParentNavigation, useCategory} from '../hooks';

// Components
import ContentView from '../components/ContentView';
import AddEditProductForm from '../containers/AddEditProductForm';

export default function AddEditProductPage() {
  useParentNavigation();
  const route = useRoute();
  const {id, type, mode} = route.params;
  const category = useCategory(id);
  const categoryName = (category && category.name) || '';
  return (
    <Container style={styles.container}>
      <ContentView style={styles.padding}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{categoryName}</Text>
          <Icon type="Entypo" name="chevron-small-right" style={styles.headingIcon} />
          <Text style={styles.headingText}>{type === 'sell' ? 'Sell' : 'Rent'}</Text>
        </View>
        <AddEditProductForm categoryId={id} type={type} mode={mode} />
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
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderColor: '#39405B',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headingIcon: {
    marginTop: 2,
  },
  headingText: {
    color: '#39405B',
    fontSize: 16,
    fontWeight: "500",
  }
});
