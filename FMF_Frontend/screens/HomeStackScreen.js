import React, {Component} from "react";
import{
    StyleSheet, Button
} from "react-native";
import {createStackNavigator} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import Profile from "./ProfileScreen";
import MapScreen from "./MapScreen";
import SearchScreen from "./SearchScreen";
import ShopScreen from "./ShopScreen";



class HomeStackScreen extends Component {
    render() {
        return(
                <AppStackNavigator/>
        );
    }
}
export default HomeStackScreen;


const AppStackNavigator = createStackNavigator({

    Home: () => <HomeScreen/>,
    Profile: () => <Profile/>,  
    Driver: () =>   <MapScreen/>,
    Shopper: () => <ShopScreen/>
},
{
        navigationOptions: {
            headerRight: (
                <Button title="hallo"></Button>
            )
        }
    })


const styles = StyleSheet.create({
    contaier:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});