import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import DialogInput from 'react-native-dialog-input';

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: [],
      display: 'Info',
      isDialogVisible: true,
      showdialognow: true
    };
  }

  // static navigationOptions = {
  //   title: 'Profile',
  // };

  //Henter en profil fra customer og gjør dataen tilgjengelig i dataSource
  componentDidMount = async () => {
    this.userid = 2; 
    return fetch('http://188.166.53.175/api/profile/' + this.userid)
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

  showDialog = () => {
    this.setState({isDialogVisible: true})
  }

  closeDialog = () => {
    this.setState({display: 'Info'})
  }

  PutFirstname=(inputText)=> {
    {
      fetch('http://188.166.53.175/api/profile/' + this.userid, {
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
    fetch('http://188.166.53.175/api/profile/' + this.userid, {
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
    fetch('http://188.166.53.175/api/profile/' + this.userid, {
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

  changeFirstName = () =>{
    this.setState({display: 'FirstName'})
  }
  changeTLF = () =>{
    this.setState({display: 'TLF'})
  }
  changeAdress = () =>{
    this.setState({display: 'Adress'})
    
  }


  renderForm = ()=>{
    // const { id } = route.params;
    // console.log({id})

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
      case 'Test':
        if (condition) {
          
        }
        return(
          <View>
          <DialogInput
            isDialogVisible = {this.showdialognow}
            title={"Juice"}
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
            hintInput ={this.state.dataSource.phone}
            submitInput={ (inputText) => {this.PutTLF(inputText)} }
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
            submitInput={ (inputText) => {this.PutAdress(inputText)} }
            closeDialog={this.closeDialog}>
        </DialogInput> 
        </View>
        )
      case 'Info':
        return(
          <View style={styles.container}>
          <View style={styles.header}></View>
          {/* Henter bilde for avatar. Kan endres senere for å hente bilde fra google bruker */}
          <Image style={styles.avatar} source={{uri: 'https://vectorified.com/images/pickle-rick-icon-2.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>

              <TouchableOpacity style={styles.buttonContainer}  >
              <Text> TEST </Text>  
              </TouchableOpacity>      

              <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeTLF}>
                <Text>{this.state.dataSource.phone}</Text> 
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer} onPress = {this.changeAdress}>
                <Text>{this.state.dataSource.address}</Text>  
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
              <Text>{"Rating: " + this.state.dataSource.rating}</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
        )
    }
  }

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        {/* <Button
        title="go to login"
        onPress={() => navigate(
          'Login',{ name: 'Jane'}
        )}
        /> */}
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
 