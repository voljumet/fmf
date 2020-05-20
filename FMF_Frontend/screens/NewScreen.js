import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingCart from '../Shopping/ShoppingCart';
import { Provider } from 'react-redux';
import store from '../../FMF_Frontend/Shopping/store';

export default class NewScreen extends React.Component {
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