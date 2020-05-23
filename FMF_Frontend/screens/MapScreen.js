import React, { Component } from "react";
import MapView, { AnimatedRegion } from "react-native-maps";
import { StyleSheet, ScrollView ,Text, View, Dimensions, Button, FlatList,  TouchableHighlight,} from "react-native";
import Geocoder from "react-native-geocoding";
import redMarker from '../assets/images/dot.png'
import Modal from 'react-native-modal';
import { Table, Row, Rows } from 'react-native-table-component';
import { List, ListItem } from "react-native-elements";



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
      listLenght: null,
    };
  }

ShowModalFunction() {
    console.log("vis modal")
    this.setState({modalVisible: !this.state.modalVisible});
}
  
  handleMarkerPress = async (event) => {
    const markerID = event.nativeEvent.id
    let object = this.state.AllLists.find(list => list.id === parseInt(markerID, 10))
    this.setState({
      currentList: object
    }, () => console.log(this.state.currentList));    
    this.ShowModalFunction()  
  }

  renderMarkers (){
    
    /*const newSet = new Set(this.state.locations)
    let liste = Array.from(newSet)*/

    return this.state.locations.map(location => {
      //newSet.add(location)
      return <MapView.Marker 
      coordinate={{ latitude: location.location.lat, longitude: location.location.lng }}
      key={location.key}
      title={location.title}
      image={redMarker}
      identifier={location.key.toString()} onPress={(event) => this.handleMarkerPress(event)}
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

  liste = []

 await fetch("http://188.166.53.175/api/orderList/")
                     .then((response) => response.json())
                     .then((responseJson) => {
                      for(const list of responseJson){ 
                        fetch("http://188.166.53.175/api/orderList/getOrderList/" + list.id)
                        .then((response) => response.json())
                        .then((resJson) => {
                          this.setState(prevState => ({
                            AllLists: [...prevState.AllLists, resJson],
                          }))
                        })                        
                          .catch((error) => {
                          console.log(error);
                        });
                        }})
                     .catch((error) => {
                       console.log(error);
                     });
                    }

                     
  /*en = new GroceryList("Lundeleitet 11, 4323 Sandnes", "Melk", "Min første handleliste", "1"),
  liste.push(en)
  to = new GroceryList("Smebyveien 17A, 2319 Hamar", "Kakao", "Min andre handleliste", "2"),
  liste.push(to)
  tre = new GroceryList("Storgata 65, 0182 Oslo", "Knekkebrød", "Min tredje handleliste", "3"),
  liste.push(tre)
  fire = new GroceryList("Karl Johans Gate 25, 0159 Oslo", "Grillpølser", "Min fjerde handleliste", "4"),
  liste.push(fire)*/

  /*for(const list of liste){
    this.setState(prevState => ({
      AllLists: [...prevState.AllLists, list],
    }))
  }*/


getGeoData() {
  console.log(this.state.AllLists.length)
  for (const list of this.state.AllLists) {
    console.log("her kjører koden mange ganger")
    if(list.shopper != null || list.shopper != undefined){
    Geocoder.from(list.shopper.address)
      .then((response) => {
        const object = {
          location: response.results[0].geometry.location,
          key: list.id,
          title: "Handleliste " + list.id,
        }
        this.setState(prevState => ({
          locations: [...prevState.locations, object]
        }))
        },
          )
      .catch((error) => console.warn(error)); }
  }
}

constructList(){
  return this.state.currentList.product.map(product => {
    this.setState({
    })
  })
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
      }}
    />
  );
};

componentDidUpdate = async (prevProps, prevState) => {
 if (this.state.AllLists !== prevState.AllLists) {
    this.getGeoData();
  }
}

  render() {
    if(this.state.currentList != null){
      return (
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <FlatList
          data={[{key: this.state.currentList.product.quantity}, {key:this.state.currentList.product.productName}, {key:this.state.currentList.product.priceFMF}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
          scrollEnabled
          horizontal={false}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={3}/>

          <Button title="knapp"
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible
            });}}>Lukk</Button>

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "70%"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});