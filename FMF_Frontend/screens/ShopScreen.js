import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingCart from '../Shopping/ShoppingCartStack';
import { Provider } from 'react-redux';
import store from '../Shopping/store';
import {Header } from "react-native-elements";


export default class ShopScreen extends React.Component {

  static navigationOptions = {
    //Setting the header of the screen
    title: 'Store',
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Provider store={store}>
        <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Create shopping list', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
        />
        <ShoppingCart />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});