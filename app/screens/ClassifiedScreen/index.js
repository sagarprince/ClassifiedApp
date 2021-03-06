/**
 * Classified Module
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Context
import {ClassifiedProvider} from './context';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductsPage from './pages/ProductsPage';
import MyProductsPage from './pages/MyProductsPage';
import AddEditProductPage from './pages/AddEditProductPage';
import AlertsPage from './pages/AlertsPage';

// navigator
const Stack = createStackNavigator();

const ClassifiedScreen = () => {
  return (
    <ClassifiedProvider>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen
          name="Home"
          component={HomePage}
          initialParams={{isHome: true}}
        />
        <Stack.Screen
          name="Category"
          component={CategoryPage}
          initialParams={{isHome: false}}
        />
        <Stack.Screen
          name="Products"
          component={ProductsPage}
          initialParams={{isHome: false}}
        />
        <Stack.Screen
          name="MyProducts"
          component={MyProductsPage}
          initialParams={{isHome: false}}
        />
        <Stack.Screen
          name="AddEditProduct"
          component={AddEditProductPage}
          initialParams={{isHome: false}}
        />
        <Stack.Screen
          name="Alerts"
          component={AlertsPage}
          initialParams={{isHome: false}}
        />
      </Stack.Navigator>
    </ClassifiedProvider>
  );
};
export default ClassifiedScreen;
