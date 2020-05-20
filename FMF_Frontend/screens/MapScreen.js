import React, { Component } from "react";
import MapView, { AnimatedRegion } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import Geocoder from "react-native-geocoding";
import redMarker from '../assets/images/dot.png'
import Modal from 'react-native-modal';

Geocoder.init("AIzaSyBh4LzOmbFVqu5wc_u_9S4yKT1rhbgHBuw");

class GroceryList{
  constructor(address, groceries, title, key){
    this.address = address;
    this.title = title;
    this.groceries = groceries;
    this.key = key;
  }
}

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      longitude: 60.256771,
      latitude: 7.909972,
      latitudeDelta: 0.0001,
      longitudeDelta: 0.0001,
      location: null,
      locations: [],
      AllLists: [],
      title: null,
      description: null,
      key: null,
      modalVisible: false,
      currentList: null,
    };
  }

ShowModalFunction() {
    console.log("vis modal")
    this.setState({modalVisible: !this.state.modalVisible});
}
  
  handleMarkerPress = (event) => {
    const markerID = event.nativeEvent.id
    const object = this.state.locations.find( ({ key }) => key === markerID )
this.setState({
currentList: object,
})    
this.ShowModalFunction()  
  }

  renderMarkers (){
    return this.state.locations.map(location => {
      return <MapView.Marker 
      coordinate={{ latitude: location.location.lat, longitude: location.location.lng }}
      title={location.title}
      description={location.description}
      key={location.key}
      image={redMarker}
      identifier={location.key} onPress={(event) => this.handleMarkerPress(event)}
      />
    })
}


componentDidMount = async () => {

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      this.setState({
        longitude: coords.longitude,
        latitude: coords.latitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      })
    },
    (error) => alert('Error: Are location services on?'),
    { enableHighAccuracy: true }
  )

  /*fetch("https://ed09c5eb.ngrok.io/api/orderLine")
                     .then((response) => response.json())
                     .then((responseJson) => {
                       console.log(responseJson)
                     })
                     .catch((error) => {
                       console.log(error);
                     });*/

  liste = []

  en = new GroceryList("Lundeleitet 11, 4323 Sandnes", "Melk", "Min første handleliste", "1"),
  liste.push(en)
  to = new GroceryList("Smebyveien 17A, 2319 Hamar", "Kakao", "Min andre handleliste", "2"),
  liste.push(to)
  tre = new GroceryList("Storgata 65, 0182 Oslo", "Knekkebrød", "Min tredje handleliste", "3"),
  liste.push(tre)
  fire = new GroceryList("Karl Johans Gate 25, 0159 Oslo", "Grillpølser", "Min fjerde handleliste", "4"),
  liste.push(fire)

  for(const list of liste){
    this.setState(prevState => ({
      AllLists: [...prevState.AllLists, list],
    }))
  }
}

getGeoData() {
  for (const list of this.state.AllLists) {
    Geocoder.from(list.address)
      .then((response) => {
        console.log(response.results[0].geometry.location)
        const object = {
          location: response.results[0].geometry.location,
          title: list.title,
          description: list.groceries,
          key: list.key
        }
        this.setState(prevState => ({
          locations: [...prevState.locations, object]
        }))
        })
      .catch((error) => console.warn(error));
  }
}

componentDidUpdate(prevProps, prevState) {
  if (this.state.AllLists !== prevState.AllLists) {
    this.getGeoData();
  }
}

  render() {
    if(this.state.currentList != null){
      return (
        <View style={styles.container}>
          <Modal
          transparent={true}
          animationType={"slide"}
          visible={this.state.modalVisible}
          onRequestClose={ () => { this.ShowModalFunction} } >
          
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>   
          <View style={styles.ModalInsideView}>
          <Text style={styles.TextStyle}>{this.state.currentList.title}</Text>
            </View>           
          </View>
        </Modal>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: this.state.latitude, 
              longitude: this.state.longitude, 
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta}}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onMarkerPress={this._onMarkerPress}

          >
            {this.renderMarkers()}
          </MapView>
        </View>
      );
  }
  else{
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: this.state.latitude, 
          longitude: this.state.longitude, 
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta}}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMarkerPress={this._onMarkerPress}

      >
        {this.renderMarkers()}
      </MapView>
    </View>
  );
}}
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
  ModalInsideView:{
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor : "#00BCD4", 
    height: 300 ,
    width: '90%',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
   
  },
  TextStyle:{
 
    fontSize: 20, 
    marginBottom: 20, 
    color: "#fff",
    padding: 20,
    textAlign: 'center'
   
  }
});