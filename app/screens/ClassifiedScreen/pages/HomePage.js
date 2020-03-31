// Core
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from 'native-base';

// Hooks
import {useParentNavigation} from '../hooks';

// Components
import ContentView from '../components/ContentView';
import HomeSearchBox from '../containers/HomeSearchBox';
import Categories from '../containers/Categories';
import MyRecommendations from '../containers/Recommendations';

export default function HomePage() {
  useParentNavigation();
  return (
    <Container style={styles.container}>
      <ContentView>
        <View style={styles.padding}>
          <HomeSearchBox />
          <Categories />
        </View>
        <MyRecommendations />
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
