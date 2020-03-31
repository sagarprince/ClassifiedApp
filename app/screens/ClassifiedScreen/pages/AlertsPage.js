// Core
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container} from 'native-base';

// Hooks
import {useParentNavigation} from '../hooks';

// Components
import ContentView from '../components/ContentView';

export default function AlertsPage() {
  useParentNavigation();

  return (
    <Container style={styles.container}>
      <ContentView style={styles.padding}>
        <Text>Alerts Page</Text>
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
