import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "763542689360-jj5ibnjo9rtf0lhf6lpd9cs6j7iqq9k6.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "763542689360-eeuh359o7rtt1lvr99bvosbe63arm739.apps.googleusercontent.com";

export default class LoginScreen extends Component {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/user.addresses.read",
          "https://www.googleapis.com/auth/user.phonenumbers.read",
        ],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.id);
        console.log("LoginScreen.js.js 21 | ", result.user.email);
        console.log("LoginScreen.js.js 21 | ", result.user.familyName);
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);

        this.props.navigation.navigate("Profile", {
          id: result.user.id,
          email: result.user.email,
          familyName: result.user.familyName,
          givenName: result.user.givenName,
          phoneNumbers: result.user.phoneNumbers,
        }); //after Google login redirect to Profile

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={this.signInWithGoogle} />
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
  },
});


