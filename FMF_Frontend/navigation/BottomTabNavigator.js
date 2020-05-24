import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import ShopScreen from "../screens/ShopScreen";
import ProfileScreen from '../screens/ProfileScreen';
import Stakk from '../screens/ProfileN';

const BottomTab = createBottomTabNavigator(


);
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Store"
        component={ShopScreen}
        options={{
          title: "Store",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-cart" />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="Stakk"
        component={Stakk}
        options={{
          title: "Stakk",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-hammer" />
          ),
        }}
      />
 
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Driver"
        component={MapScreen}
        options={{
          title: "Driver",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-list-box" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'ShoppingCart':
      return 'Search for products';
    case 'Profile':
      return 'Change profile information';
    case 'Driver': 
      return 'Discover shop locations';  
  }
}
