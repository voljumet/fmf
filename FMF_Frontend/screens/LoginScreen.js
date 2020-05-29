import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, View, Image } from 'react-native';
import * as AppAuth from 'expo-app-auth';

export default class Login extends Component {
  constructor(){
    super();
    this.state={
      authState: null,
      StorageKey:'AIzaSyDQIiRi5UWFD7qbHpVcIk_Sj8kHaMQ85s8',
      auth: null,
      config: {
        issuer: 'https://accounts.google.com',
        scopes:[ 
        'openid', 
        'profile',
        'email',
      ],
        clientId: '763542689360-jj5ibnjo9rtf0lhf6lpd9cs6j7iqq9k6.apps.googleusercontent.com',
      }
    }
  }
  
   signInAsync= async ({navigation})=> {
     
    this.state.auth = await AppAuth.authAsync(this.state.config)
    const result = await this.fetchUserInfo(this.state.auth.accessToken);
    let email = result["email"];
    if (email != null) {
      
      this.props.navigation.navigate("Profile", {
        googleId: result["id"],
        email: result["email"],
        lastName: result["family_name"],
        firstName: result["given_name"],
        picture: result["picture"],
      });

    }    
    return this.state.auth
  }
  
  fetchUserInfo= async(accessToken) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });
    return await response.json();
  }

  cacheAuthAsync=async(authState)=> {
    return await AsyncStorage.setItem(this.state.StorageKey, JSON.stringify(authState));
  }

  getCachedAuthAsync= async() => {
    let value = await AsyncStorage.getItem(this.state.StorageKey);
    this.setState({authState: JSON.parse(value)});
    if (this.state.authState) {
      if (this.checkIfTokenExpired(this.state.authState)) {
        return this.refreshAuthAsync(this.state.authState);
      } else {
        return this.state.authState;
      }
    }
    return null;
  }
  checkIfTokenExpired=({ accessTokenExpirationDate }) =>{
    return new Date(accessTokenExpirationDate) < new Date();
  }
  refreshAuthAsync=async({ refreshToken })=> {
    const getøojeBNF = await AppAuth.refreshAsync(this.state.config, refreshToken);
    this.setState({authState: getøojeBNF});
    await this.cacheAuthAsync(this.state.authState);
    return this.state.authState;
  }
  signOutAsync= async({ accessToken })=> {
    try {
      
      await AppAuth.revokeAsync(this.state.config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(this.state.StorageKey);
      return null;
    } catch (e) {
      alert(`Kunne ikke tilbakekalle kode: ${e.message}`);
    }
  }

  componentDidMount=async()=>{
    const cachedAuth = await this.getCachedAuthAsync();
    if (cachedAuth && !this.state.authState) {
      this.setState({authState: cachedAuth});
    }
  }

  render(){
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    return (
      <View style={styles.container}>
        <Image
          source={
            __DEV__
              ? require("../assets/images/icon.png")
              : require("../assets/images/icon.png")
          }
          style={styles.loginImg}
        />
  
        <Button
          title="Logg inn med Google"
          onPress={async () => {
            const _authState = await this.signInAsync({});
            this.setState({authState: _authState});
          }}
        />
         <Button
          title="Logg ut"
          onPress={async () => {
            await this.signOutAsync(this.state.authState);
            this.setState({authState: null});
          }}
        /> 
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    scaleX: 2,
  },
  loginImg: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginBottom: 50,
  },
});

