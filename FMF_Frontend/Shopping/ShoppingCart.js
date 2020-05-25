import React, {Component} from "react";
import{
    StyleSheet
} from "react-native";


import ShoppingCartIcon from "./ShoppingCartIcon";
import {createStackNavigator} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import CartScreen from "../screens/CartScreen";



class ShoppingCart extends Component {
    render() {
        return(
                <AppStackNavigator/>
        );
    }
}
export default ShoppingCart;



const AppStackNavigator = createStackNavigator({

    Home: () => <SearchScreen/>,
    Cart: () => <CartScreen/>
    
},{
        navigationOptions: {
            headerTitle:"Search for groceries",
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