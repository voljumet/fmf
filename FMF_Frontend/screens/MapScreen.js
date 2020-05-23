import React, { Component } from "react";
import MapView, { AnimatedRegion } from "react-native-maps";
import { StyleSheet, ScrollView ,Text, View, Dimensions, Button, FlatList,  TouchableHighlight, Item} from "react-native";
import Geocoder from "react-native-geocoding";
import redMarker from '../assets/images/dot.png'
import Modal from 'react-native-modal';
import { Table, Row, Rows } from 'react-native-table-component';
import { List, ListItem } from "react-native-elements";
import { Header } from "react-native-elements";



Geocoder.init("AIzaSyBh4LzOmbFVqu5wc_u_9S4yKT1rhbgHBuw");

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
      listData: []
    };
  }

ShowModalFunction = async () => {
    this.setState({modalVisible: !this.state.modalVisible});
}
  
  handleMarkerPress = async (event) => {
    const markerID = event.nativeEvent.id
    let object = this.state.AllLists.find(list => list.id === parseInt(markerID, 10))
    this.setState({
      currentList: object,
    });   
    this.ShowModalFunction()
    
  }

  renderMarkers (){
    return this.state.locations.map(location => {
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

 await fetch(" https://659cad17.ngrok.io/api/orderList/")
                     .then((response) => response.json())
                     .then((responseJson) => {
                      for(const list of responseJson){ 
                        fetch(" https://659cad17.ngrok.io/api/orderList/getOrderList/" + list.id)
                        .then((response) => response.json())
                        .then((resJson) => {
                          if(resJson.shopper != null || resJson.shopper != undefined && resJson.available){
                            console.log(resJson)
                          this.getGeoData(resJson)
                          this.setState(prevState => ({
                            AllLists: [...prevState.AllLists, resJson],
                          }
                          ))
                        }})                        
                          .catch((error) => {
                          console.log(error);
                        });
                        }
                      })
                     .catch((error) => {
                       console.log(error);
                     });


                    }


getGeoData(list) {
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

putBackend= async () => {

  this.setState(prevState => ({
    currentList: {                  
        ...prevState.currentList,    
        available: false       
    }
}))

    await fetch(' https://659cad17.ngrok.io/api/orderList/PutOrderList/' + this.state.currentList.id, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "id": this.state.currentList.id, 
          "available": false,
      })
  })
}

/*renderItem = ({item}) => (
  <View>
  <Text>{item.productName}</Text>
  </View>

);
*/
componentDidUpdate = async (prevProps, prevState) => {
}

  render() {
    const {navigate} = this.props.navigation;
    if(this.state.currentList != null){
      return (
        <View style={styles.container}>
          <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Available Shopping Lists', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
        />
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
          data={this.state.currentList.products}
          renderItem={({item, index, separators}) => (
              <View style={{backgroundColor: 'white'}}>
                <Text style={styles.modalText}>{item.quantity}</Text>
                <Text style={styles.modalText}>{item.productName}</Text>
                <Text style={styles.modalText}>{item.priceFMF},-</Text>
              </View>
          )}
          scrollEnabled
          horizontal={false}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}/>

          <TouchableHighlight
              style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
              onPress={this.putBackend}
            >
            <Text style={styles.textStyle}> Book liste</Text>
            </TouchableHighlight>
          <TouchableHighlight
              style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setState({
                  modalVisible: !this.state.modalVisible
                });
              }}
            >
            <Text style={styles.textStyle}> Lukk</Text>
            </TouchableHighlight>
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
      <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Available Shopping Lists', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
        />
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
    marginTop: 22,
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
  closeButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginLeft: 13,
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 40
}
});