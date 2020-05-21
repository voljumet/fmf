import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { Button } from "react-native-elements";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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