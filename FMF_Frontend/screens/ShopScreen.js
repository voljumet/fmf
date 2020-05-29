import React from 'react';
import ShoppingCart from '../Shopping/ShoppingCart';
import { Provider } from 'react-redux';
import store from '../Shopping/store';
import { Header } from "react-native-elements";

export default class ShopScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Provider store={store}>
        <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Lag handleliste', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
        />
        <ShoppingCart userId={this.props.route.params.userId}/>
      </Provider>
    );
  }
}console.disableYellowBox = true;