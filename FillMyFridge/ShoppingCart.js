import React, {Component} from "react";
import{
    View,
    Text,
    StyleSheet
} from "react-native";



import ShoppingCartIcon from "./screens/ShoppingCartIcon";
import {createStackNavigator} from 'react-navigation';

import {Provider} from 'react-redux';
import store from './store';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import NewScreen from './screens/NewScreen';
import LinksScreen from "./screens/LinksScreen";
import CartScreen from "./screens/CartScreen";



class ShoppingCart extends Component {
    render() {
        return(
                <AppStackNavigator/>
        );
    }
}
export default ShoppingCart;





const AppStackNavigator = createStackNavigator({

    Home: () => <SearchScreen/>
    
},{
        navigationOptions: {
            headerRight: (
                <ShoppingCartIcon/>
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