import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingCart from '../Shopping/ShoppingCart';
import { Provider } from 'react-redux';
import store from '../Shopping/store';
import { Header } from "react-native-elements";


export default class NewScreen extends React.Component {
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