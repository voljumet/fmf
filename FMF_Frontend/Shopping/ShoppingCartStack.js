import React, {Component} from "react";
import{
    StyleSheet
} from "react-native";
import {createStackNavigator} from 'react-navigation';

import ShoppingCartIcon from "./ShoppingCartIcon";
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
    
},
{
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