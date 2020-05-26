import React, {Component} from "react";
import{
    StyleSheet
} from "react-native";


import ShoppingCartIcon from "./ShoppingCartIcon";
import {createStackNavigator} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import CartScreen from "../screens/CartScreen";


var ID = ""
class ShoppingCart extends Component {

    
    render() {
       console.log("sdf",this.props.userId)
        ID = this.props.userId
        return(
            
            
                <AppStackNavigator 
                />
                
        );
        
    }
    
}

export default ShoppingCart;



const AppStackNavigator = createStackNavigator({

    

    Home: () => <SearchScreen />,
    Cart: () => <CartScreen userId={ID} />
    
},{
        navigationOptions: {
            headerTitle:"Search for groceries",
            headerRight: (
                <ShoppingCartIcon />
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