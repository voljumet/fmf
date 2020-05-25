import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { ScrollView } from 'react-native-gesture-handler';
import {Header } from "react-native-elements";


export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: [],
      display: 'enterProfileScreen',
      isDialogVisible: true,
      showdialognow: true,
    };
    const url = 'https://630589b8.ngrok.io/api/profile';
  }

//Henter en profil fra customer og gjør dataen tilgjengelig i dataSource
componentDidMount = async () => {
  // console.log(this.props.route.params);
  return fetch("https://630589b8.ngrok.io/api/profile",)
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
      dataSource: responseJson,
    });
  })
  .catch((error) => {
    alert(error);
  });
}

searchForGoogleId=()=>{
  let orgner = this.props.route.params.id;
  let filtered = this.state.dataSource.find((item=>item.googleId===orgner))
  console.log(filtered)
  return filtered;
}

  showDialog = () => {
    this.setState({isDialogVisible: true})
  }

  closeDialog = () => {
    this.setState({display: 'newUser'})
  }

  displayInfo = () => {
    this.setState({display: 'Info'})
  }
  displaynewUser = () => {
    this.setState({display: 'newUser'})
  }

  PutFirstname=(inputText)=> {
    {
      fetch(this.url + this.userid, {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "Id": this.userid, 
              "firstName": inputText,
          })
      })
  }
  }
  PutTLF=(inputText)=> {
    fetch(this.url + this.userid, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "Id": this.userid, 
          "phone": inputText,
      })
  })
  }
  PutAdress=(inputText)=> {
    fetch(this.url + this.userid, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "Id": this.userid, 
          "address": inputText,
      })
  })
  }

  PostProfile=()=>{
    fetch("https://630589b8.ngrok.io/api/profile", {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "firstName": this.props.route.params.firstName,
          "lastName": this.props.route.params.lastName,
          "email": this.props.route.params.email,
          "phone": this.phone,
          "address": this.address,
          "googleId": this.props.route.params.id, 
      })
  })
  }

  changeFirstName = () =>{
    this.setState({display: 'FirstName'})
  }
  changeTLF = () =>{
    this.setState({display: 'TLF'})
  }
  changeAdress = () =>{
    this.setState({display: 'Adress'})
  }
  newProfile = () =>{
    this.setState({display: 'newUser'})
  }

  renderForm = ()=>{
    switch(this.state.display){
      case 'FirstName':
        return(
          <View>
          <DialogInput
            isDialogVisible = {this.showdialognow}
            title={"Profile info"}
            message={"Change your name"}
            hintInput ={this.state.dataSource.firstName}
            submitInput={ (inputText) => {this.PutFirstname(inputText)} }
            closeDialog={this.closeDialog}>
        </DialogInput> 
        </View>
        )
      case 'TLF':
        return(
          <View>
          <DialogInput
            isDialogVisible = {this.showdialognow}
            title={"Profile info"}
            message={"Change your TLF"}
            hintInput ={"Phone"}
            submitInput={ (inputText) => {this.phone = inputText} } //this.PutTLF(inputText)
            closeDialog={this.closeDialog}>
        </DialogInput> 
        </View>
        )
      case 'Adress':
        return(
          <View>
          <DialogInput
            isDialogVisible = {this.showdialognow}
            title={"Profile info"}
            message={"Change your Adress"}
            hintInput ={this.state.dataSource.address}
            submitInput={ (inputText) => {this.address = inputText} } //this.PutAdress(inputText)
            closeDialog={this.closeDialog}>
        </DialogInput> 
        </View>
        )
        case 'enterProfileScreen':
          
          if(this.searchForGoogleId() != null){
            return (this.displaynewUser)
          }else{
            return (this.displayInfo)
          }
       
      case 'Info':
        if(this.searchForGoogleId() != null){
          
        }
        return(
          <View style={styles.container}>
          <View style={styles.header}></View>
          {/* Henter bilde for avatar. Kan endres senere for å hente bilde fra google bruker */}
          <Image style={styles.avatar} source={{uri: this.props.route.params.picture}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>

              <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeFirstName}>
              <Text>{this.props.route.params.firstName}</Text>  
              </TouchableOpacity>      

              <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeTLF}>
                <Text>{this.props.route.params.lastName}</Text> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeAdress}>
                <Text>{this.props.route.params.email}</Text>  
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.buttonContainer}>
              <Text>{this.props.route.params.phone}</Text> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
              <Text>{this.props.route.params.address}</Text> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
              <Text>Sing out</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
        )
        

        case 'newUser':
          return(
            <ScrollView>
            <View style={styles.container}>
            <View style={styles.header}></View>
            {/* Henter bilde for avatar. Kan endres senere for å hente bilde fra google bruker */}
            <Image style={styles.avatar} source={{uri: this.props.route.params.picture}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
  
                <TouchableOpacity style={styles.buttonContainer} >
                <Text>{this.props.route.params.firstName}</Text>  
                </TouchableOpacity>      
  
                <TouchableOpacity style={styles.buttonContainer} >
                  <Text>{this.props.route.params.lastName}</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}>
                <Text>{this.props.route.params.email}</Text> 
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeTLF}>
                <Text>Add Phone number</Text>  
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeAdress}>
                <Text>Add address</Text>  
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.buttonContainer} onPress= {this.PostProfile}>
                <Text>Save Profile</Text> 
                </TouchableOpacity>
              </View>
          </View>
        </View>
        </ScrollView>
      )
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Header
        leftComponent={{ icon: 'home', color: '#fff', onPress: () => navigate("Home")}}
        centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
        rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigate("Profile")}}
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
 
