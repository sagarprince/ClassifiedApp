import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Button, Icon, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();
  return (
    <Container style={styles.container}>
      <Button onPress={() => navigation.navigate('Classified')}>
        <Icon type="MaterialIcons" name="dashboard" />
        <Text>Show Classified</Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
