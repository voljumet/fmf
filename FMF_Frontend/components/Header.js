import React, { Component } from "react";
import { Button, Header } from "react-native-elements";

export default class Head extends Component{

    render(){
        return(
        <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
/>)
    }
}