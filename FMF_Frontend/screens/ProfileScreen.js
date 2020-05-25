import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Header } from "react-native-elements";

import * as AppAuth from 'expo-app-auth';
import { TextInput } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      display: "Info",
      isDialogVisible: true,
      showdialognow: true,
      storedGoogleId: null,
      userId: null,
    };
  }

  // henter alle google id, sammenligner med den man får fra loginscreen å ser om den eksisterer i Db, 
  // bruker så id til å hente profil fra Db

  async componentDidMount() {

// 1. ------------------------------------------------------------------------------------------
    const requestGoogle = async () => {
      const response = await fetch("https://3b19a865.ngrok.io/api/profile/googleid");
      const json = await response.json();
      let googleIdFromLogin = this.props.route.params.googleId;

      // Bruk denne til å printe googleId fra login, så legg den inn i initializer!
      // console.log("googleId fra loginScreen: "+googleIdFromLogin)
      // -------------------------------------------------------------------------

      for (var i = 0; i < json.length; i++) {
        if (json[i].googleId == googleIdFromLogin) {
          this.setState({
            userId: json[i].id,

            // Saving as array, all googleId's from FMF_Db
            storedGoogleId :json
          });

          console.log("Existing googleId in FMF_Db!")
        } else {
          // If googleId from login does not exist in FMF_Db
          // Do stuff to make the user POST info to Db
        }
      }
    };

// 2. ------------------------------------------------------------------------------------------
    requestGoogle();

// 3. ------------------------------------------------------------------------------------------
    const requestProfile = async () => {
       const response = await fetch("https://3b19a865.ngrok.io/api/profile/" + this.state.userid );
       const json = await response.json();
       this.setState({
        dataSource: json,
       });

      // NOE FEIL HER, går ikke å printe profile som blir hentet???!?!?!?!
      //  ----------------------------->>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------
      //  ----------------------------->>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------
    
    };

// 4. ------------------------------------------------------------------------------------------
    requestProfile();
    
  }



  getIdbyGoogleId = () => {
    // var userId = this.state.storedGoogleId.find(Item=>Item.googleId == this.props.route.params.googleId)
    // console.log("datasource: "+this.state.dataSource.length);
    // console.log("USER GOOGLEID: " + this.props.route.params.googleId)
    
    // console.log("USER ID: " + userId)
  };

  showDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  closeDialog = () => {
    this.setState({ display: "Info" });
  };

  PutFirstname = (inputText) => {
    {
      fetch("https://ed6e1b85.ngrok.io/api/profile/" + this.state.userid, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: this.userid,
          firstName: inputText,
        }),
      });
    }
  };
  PutTLF = (inputText) => {
    fetch("https://ed6e1b85.ngrok.io/api/profile/" + this.state.userid, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.userid,
        phone: inputText,
      }),
    });
  };
  PutAdress = (inputText) => {
    fetch("https://ed6e1b85.ngrok.io/api/profile/" + this.state.userid, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.userid,
        address: inputText,
      }),
    });
  };

  changeFirstName = () => {
    this.setState({ display: "FirstName" });
  };
  changeTLF = () => {
    this.setState({ display: "TLF" });
  };
  changeAdress = () => {
    this.setState({ display: "Adress" });
  };

  renderForm = () => {
    switch (this.state.display) {
      case "FirstName":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profile info"}
              message={"Change your name"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutFirstname(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );
      case "TLF":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profile info"}
              message={"Change your TLF"}
              hintInput={this.state.dataSource.phone}
              submitInput={(inputText) => {
                this.PutTLF(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );
      case "Adress":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profile info"}
              message={"Change your Adress"}
              hintInput={this.state.dataSource.address}
              submitInput={(inputText) => {
                this.PutAdress(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );
      case "Info":
        return (
          <View style={styles.container}>
            <View style={styles.header}></View>
            {/* Henter bilde for avatar. Kan endres senere for å hente bilde fra google bruker */}
            <Image
              style={styles.avatar}
              source={{
                uri: "https://vectorified.com/images/pickle-rick-icon-2.png",
              }}
            />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.changeFirstName}
                >
                  <Text>{this.state.dataSource.firstName}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.changeTLF}
                >
                  <Text>{this.state.dataSource.phone}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.changeAdress}
                >
                  <Text>{this.state.dataSource.address}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}>
                  <Text>{"Rating: " + this.state.dataSource.rating}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  render() {
    this.getIdbyGoogleId();

    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header
          leftComponent={{
            icon: "home",
            color: "#fff",
            onPress: () => navigate("Home"),
          }}
          centerComponent={{
            text: "Available Shopping Lists",
            style: { color: "#fff" },
          }}
          rightComponent={{
            icon: "person",
            color: "#fff",
            onPress: () => navigate("Profile"),
          }}
        />
        {this.renderForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    textAlign: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 