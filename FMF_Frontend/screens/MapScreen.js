import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyBh4LzOmbFVqu5wc_u_9S4yKT1rhbgHBuw");

class GroceryList{
  constructor(address, groceries, title){
    this.address = address;
    this.title = title;
    this.groceries = groceries;
  }
}

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      addresses: ["Lundeleitet 11, 4323 Sandnes", "Eiffel Tower", "Mølleveien 2D, 4879 Grimstad"],
      locations: [],
      Lists: [],
      title: null,
      description: null,
    };
  }
  renderMarkers(){
    return this.state.locations.map(location => {
      return <MapView.Marker 
      coordinate={{ latitude: location.lat, longitude: location.lng }}
      title={this.state.title}
      description={this.state.description}
      key={location.lat}/>
    })
}

componentDidMount = async () => {

  liste = []

  en = new GroceryList("Lundeleitet 11, 4323 Sandnes", "Melk", "Min første handleliste"),
  liste.push(en);

  to = new GroceryList("Smebyveien 17A, 2319 Hamar", "Kakao", "Min andre handleliste"),
  liste.push(to)
  tre = new GroceryList("Storgata 65, 0182 Oslo", "Knekkebrød", "Min tredje handleliste"),
  liste.push(tre)
  fire = new GroceryList("Karl Johans Gate 25, 0159 Oslo", "Grillpølser", "Min fjerde handleliste"),
  liste.push(fire)

    this.setState(prevState => ({
      Lists: [...prevState.Lists, liste]
    }))
}

getGeoData() {
  console.log(this.state.Lists)
  for (const list of this.state.Lists) {
    Geocoder.from(list.address)
      .then((response) => {
        this.setState(prevState => ({
          locations: [...prevState.locations, response.results[0].geometry.location]
        }))
        this.setState({
          title: list.title,
          description: list.groceries,
        })
      })
      .catch((error) => console.warn(error));
  }
}

componentDidUpdate(prevProps, prevState) {
  if (this.state.Lists !== prevState.Lists) {
    this.getGeoData();
  }
}

  render() {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {this.renderMarkers()}
          </MapView>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});