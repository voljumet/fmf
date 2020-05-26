import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Header } from "react-native-elements";

import * as AppAuth from 'expo-app-auth';
import { TextInput } from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';

import t from 'tcomb-form-native'; // 0.6.9

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
      Check: false,
      tlfphone:null,
      adressnew:null
    };
  }

  // henter alle google id, sammenligner med den man får fra loginscreen å ser om den eksisterer i Db, 
  // bruker så id til å hente profil fra Db

  async componentDidMount() {

    // 1. ------------------------------------------------------------------------------------------
    requestGoogle = async () => {
      const response = await fetch("https://c0b16483.ngrok.io/api/profile/googleid");
      const json = await response.json();
      let googleIdFromLogin = this.props.route.params.googleId;

      // Bruk denne til å printe googleId fra login, så legg den inn i initializer!

      // console.log("googleId fra loginScreen: "+googleIdFromLogin)
      // -------------------------------------------------------------------------

      for (var i = 0; i < json.length; i++) {

        if (json[i].googleId === googleIdFromLogin) {
          await this.setState({
            userId: json[i].id,
            Check: true,
            // Saving as array, all googleId's from FMF_Db
            storedGoogleId: json
          });

          requestProfile();
          console.log("Existing googleId in FMF_Db!")

        }
      }

      if (this.state.Check === false) {
        console.log("neste");
        this.setState({
          display: "NewUser"
        })

      }


    };

    // 2. ------------------------------------------------------------------------------------------
    requestGoogle();

    // 3. ------------------------------------------------------------------------------------------
    const requestProfile = async () => {



      const response = await fetch("https://c0b16483.ngrok.io/api/profile/" + this.state.userId);
      const json = await response.json();
      this.setState({
        dataSource: json,
      });

      // NOE FEIL HER, går ikke å printe profile som blir hentet???!?!?!?!
      //  ----------------------------->>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------
      //  ----------------------------->>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------



    };

    // 4. ------------------------------------------------------------------------------------------


  }


  handleSubmit = () => {

    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value.Tlf);
    this.setState({
      tlfphone: value.Tlf,
      adressnew: value.Adress
    })
    console.log( JSON.stringify({
      googleId: this.props.route.params.googleId,
      lastName: this.props.route.params.lastName,
      firstName: this.props.route.params.firstName,
      phone: value.Tlf,
      address: value.Adress,

    }))
    fetch("https://c0b16483.ngrok.io/api/profile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleId: this.props.route.params.googleId,
          lastName: this.props.route.params.lastName,
          firstName: this.props.route.params.firstName,
          phone: value.Tlf,
          address: value.Adress,

        }),
      });
      this.componentDidMount()
      this.setState({
      
      display:"Info"
    })
    
  
  }

 

  showDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  closeDialog = () => {
    this.setState({ display: "Info" });
  };

  PutFirstname = (inputText) => {
    var ID = this.state.userId
    console.log("from PUT:",JSON.stringify({
      id: ID,
          firstName: inputText,
          googleId: this.props.route.params.googleId,
          lastName: this.props.route.params.lastName,
          phone: this.state.tlfphone,
          address: this.state.adressnew
    }))
    {
      fetch("https://c0b16483.ngrok.io/api/profile/" + this.state.userId , {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: inputText,
          googleId: this.props.route.params.googleId,
          lastName: this.props.route.params.lastName,
          phone: this.state.tlfphone,
          address: this.state.adressnew
          
          
        }),

        
        
      });
      this.setState({
        display:"Info"
      })
      this.componentDidMount()
      
    
    }
  };
  changeFirstName = () => {
    this.setState({ display: "FirstName" });
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
                  <Text>{this.state.tlfphone}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.changeAdress}
                >
                  <Text>{this.state.adressnew}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}>
                  <Text>{"Rating: " + this.state.dataSource.rating}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={this.changeFirstName}
                >
                  <Text>Change profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case "NewUser":
        const Form = t.form.Form;

        const User = t.struct({
          
          Tlf: t.String,
          Adress: t.String,
          terms: t.Boolean
        
         
        });
        return (
          <View style={styles.container}>

          <Text > We need your tlf to complete sign in </Text>
          <Form 
            ref={c => this._form = c}
            type={User} 
            options={options} // pass the options via props
          />
          
          <Button
            title="Sign Up!"
            onPress={this.handleSubmit}
          />
        
        </View>

          );

    }
  };

  render() {
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

const options = {
  
  fields: {
    Tlf:  {
      
      placeholder:"sfd",
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    Adress: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    textAlign: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
