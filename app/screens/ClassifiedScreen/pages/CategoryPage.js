// Core
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import { useRoute } from '@react-navigation/native';

// Hooks
import { useParentNavigation, useCategory } from '../hooks';

// Components
import ContentView from '../components/ContentView';

export default function CategoryPage() {
  const navigation = useParentNavigation();
  const route = useRoute();
  const { id } = route.params;
  const category = useCategory(id);

  return (
    <Container style={styles.container}>
      <ContentView style={styles.padding}>
        <View style={styles.centered}>
          <View style={styles.headingIcon}>
            {category && (
              <Image
                source={category.icon}
                resizeMode={'contain'}
                style={styles.headingIcon}
              />
            )}
          </View>
          <Text style={styles.heading}>{category && category.name}</Text>
        </View>
        <View style={styles.grid}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Products', { id, type: 'buy' })}>
            <Text style={styles.buttonText}>I want to Buy</Text>
            <Icon type="Entypo" name="chevron-thin-right" style={styles.icon} />
          </Button>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddEditProduct', { id, type: 'sell', mode: 'add' })
            }>
            <Text style={styles.buttonText}>I want to Sell</Text>
            <Icon type="Entypo" name="chevron-thin-right" style={styles.icon} />
          </Button>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('Products', { id, type: 'rent' })}>
            <Text style={styles.buttonText}>I want to Rent</Text>
            <Icon type="Entypo" name="chevron-thin-right" style={styles.icon} />
          </Button>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddEditProduct', { id, type: 'rent', mode: 'add' })
            }>
            <Text style={styles.buttonText}>I want to give on Rent</Text>
            <Icon type="Entypo" name="chevron-thin-right" style={styles.icon} />
          </Button>
        </View>
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
  centered: {
    alignItems: 'center',
  },
  headingIcon: {
    width: 70,
    height: 70,
  },
  heading: {
    marginTop: 10,
    color: '#39405B',
    fontWeight: '500',
    fontSize: 22,
  },
  grid: {
    marginTop: 20,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 0,
    marginBottom: 20,
    backgroundColor: '#39405B',
    borderRadius: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    fontSize: 18,
  },
});
