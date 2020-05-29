import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,

} from "react-native";
import { Button, Header, Icon } from "react-native-elements";

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  render(){
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    const {navigate} = this.props.navigation;
  return (
    <View style={styles.container}>
        <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Hjem', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
        />        
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
            Hva vil du gjøre i dag?
          </Text>
      
          <View>
            <View marginTop={20}>
              <Button 
                titleStyle={{
                  color: "white",
                  marginTop: 0,
                  marginBottom: 25,
                  fontSize: 70,
                  fontFamily: "arista",
                }}
                style={styles.RectangleShape}
                // Text inside button-------------
                title="Sjåfør"
                // Text inside button-------------
                onPress={() =>
                  navigate('Driver', {userId: this.props.route.params.userId})
                }
              />
            </View>

            <View marginTop={20}>
              <Button
                titleStyle={{
                  color: "white",
                  marginTop: 0,
                  marginBottom: 25,
                  fontSize: 70,
                  fontFamily: "arista",
                }}
                style={styles.RectangleShape}
                // Text inside button-------------
                title="Kjøper"
                // Text inside button-------------
                onPress={() => navigate("ShopScreen", {userId: this.props.route.params.userId})}
              />
            </View>
          </View>
        </View>
    </View>
  );
}
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
    height: 150,
    resizeMode: "contain",
    marginTop: 40,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
});