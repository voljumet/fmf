import React, {Component} from "react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import {createStackNavigator} from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from "../screens/CartScreen";

var ID = ""
class ShoppingCart extends Component {
    render() {
        ID = this.props.userId
        return(
                <AppStackNavigator/>  
        );   
    }
}

export default ShoppingCart;

const AppStackNavigator = createStackNavigator({
    Home: () => <SearchScreen />,
    Cart: () => <CartScreen userId={ID} />
},{
        navigationOptions: {
            headerTitle:"Søk etter varer",
            headerRight: (
                <ShoppingCartIcon />
            )
        }
    })