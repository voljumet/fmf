import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingCart from '../Shopping/ShoppingCartStack';
import { Provider } from 'react-redux';
import store from '../Shopping/store';

export default class ShopScreen extends React.Component {

  static navigationOptions = {
    //Setting the header of the screen
    title: 'Store',
  };

  render() {
    return (
      <Provider store={store}>
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