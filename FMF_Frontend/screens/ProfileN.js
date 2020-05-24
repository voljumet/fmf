import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import DialogInput from "react-native-dialog-input";
import signInAsync from "./LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";

async function juice(){
const DEMO_TOKEN = await AsyncStorage.getItem();
if (DEMO_TOKEN === null) {
  navigation.navigate("Login", {
    onGoBack: () => this.refresh(),
  });
}
}

export default function ProfileN({ route,navigation }) {

  const authorized = null;

   if (authorized != null) {
     console.log("ikke null");
     // const { authState } = route.params;
     // const { result } = route.params;
     const { googleId } = route.params;
     const { authState } = route.params;

     authorized = authState;
    //  console.log({googleId});

    } else {
      console.log("null")
      juice();
      console.log("nav done")

    }

//   const { googleId } = route.params;
  // const { email } = route.params;
  // const { lastName } = route.params;
  // const { firstName } = route.params;
  // const { picture } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={
              __DEV__
                ? require("../assets/images/icon.png")
                : require("../assets/images/icon.png")
            }
            style={styles.logoImage}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.getStartedText}>
            What do you want to continue as today?
          </Text>

          {/* <Text style={styles.tabBarInfoText}>Info fra login:</Text> */}
          {/* <Text style={styles.tabBarInfoText}>id: {googleId}</Text> */}
          {/* <Text style={styles.tabBarInfoText}>email: {email}</Text> */}
          {/* <Text style={styles.tabBarInfoText}>navn: {firstName}, {lastName}</Text> */}
          {/* <Text style={styles.tabBarInfoText}>id: {picture}</Text> */}

          <View>
            <View marginTop={20}>
              <Button
                titleStyle={{
                  color: "white",
                  marginTop: 25,
                  marginBottom: 25,
                  fontSize: 90,
                  fontFamily: "arista",
                }}
                style={styles.RectangleShape}
                // Text inside button-------------
                title="Driver"
                // Text inside button-------------
                onPress={() => navigation.navigate("Driver")}
              />
            </View>

            <View marginTop={20}>
              <Button
                titleStyle={{
                  color: "white",
                  marginTop: 25,
                  marginBottom: 25,
                  fontSize: 90,
                  fontFamily: "arista",
                }}
                style={styles.RectangleShape}
                // Text inside button-------------
                title="Shopper"
                // Text inside button-------------
                onPress={() => navigation.navigate("Store")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  RectangleShape: {
    //To make Square Shape
    width: 300,
    height: 130,
    alignSelf: "center",
    margin: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#3c6fb5",
  },
  multiButtonContainer: {
    margin: 10,
    fontSize: 50,
    alignContent: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  logoImage: {
    height: 120,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
});