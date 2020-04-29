import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoginScreen from '../screens/LoginScreen';
import NewScreen from '../screens/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen';




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
        component={NewScreen}
        options={{
          title: "Store",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-cart" />
          ),
        }}
      />

        <BottomTab.Screen
        name="ProfileScreen" s
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />



      <BottomTab.Screen
        name="Profile"
        component={LoginScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Driver"
        component={MapScreen}
        options={{
          title: "Driver",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-globe" />
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
