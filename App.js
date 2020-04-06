/**
 * Globant - MY GStore
 */

// dependencies
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image } from 'react-native';
import { Root, Button, Icon } from 'native-base';

// redux store
import { store } from './app/store/store';

// screens
import DashboardScreen from './app/screens/DashboardScreen/DashboardScreen';
import ClassifiedScreen from './app/screens/ClassifiedScreen';

// navigator
const Stack = createStackNavigator();

const Logo = () => {
  return (
    <React.Fragment>
      <Image
        style={{ marginLeft: 15, width: 45, height: 45 }}
        source={require('@Asset/images/logo.png')}
      />
    </React.Fragment>
  );
};

const HeaderRight = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Button transparent>
        <Icon type="MaterialIcons" name="search" style={{ color: 'white' }} />
      </Button>
    </View>
  );
};

const App = () => (
  <Root>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#8EBF37',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          initialRouteName="Dashboard">
          <Stack.Screen name="Glow Store" component={DashboardScreen} />
          <Stack.Screen
            name="Classified"
            options={{
              title: 'Glow Classified',
              headerLeft: () => <Logo />,
              headerRight: () => <HeaderRight />,
            }}
            component={ClassifiedScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  </Root>
);
export default App;
