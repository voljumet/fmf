import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import loginNavigation from './navigation/loginNavigation';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/ProfileScreen';
import Login from './screens/LoginScreen';
import ShopScreen from './screens/ShopScreen';
import SearchScreen from './screens/SearchScreen';



const Stack = createStackNavigator();


export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          "arista": require("./assets/fonts/Bubbleboddy-FatTrial.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator screenOptions={{
          headerShown: false
          }}>
            <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} 
            />
            <Stack.Screen name="Driver" component={MapScreen} />
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Store" component={ShopScreen} />
            <Stack.Screen name="Shop" component={SearchScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});