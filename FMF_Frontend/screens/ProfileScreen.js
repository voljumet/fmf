import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import DialogInput from "react-native-dialog-input";
import { Header } from "react-native-elements";

import t from "tcomb-form-native"; // 0.6.9

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
      tlfphone: null,
      adressnew: null,
    };
  }

  async componentDidMount() {
    requestGoogle = async () => {
      const response = await fetch(
        "https://574e87637d42.ngrok.io/api/profile/googleid"
      );
      const json = await response.json();
      let googleIdFromLogin = this.props.route.params.googleId;

      for (var i = 0; i < json.length; i++) {
        if (json[i].googleId === googleIdFromLogin) {
          await this.setState({
            userId: json[i].id,
            Check: true,
            // Saving as array, all googleId's from FMF_Db
            storedGoogleId: json,
          });

          requestProfile();
        }
      }

      if (this.state.Check === false) {
        this.setState({
          display: "NewUser",
        });
      }
    };

    requestGoogle();
    const requestProfile = async () => {
      const response = await fetch(
        "https://574e87637d42.ngrok.io/api/profile/" + this.state.userId
      );
      const json = await response.json();
      this.setState({
        dataSource: json,
      });
    };
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    this.setState({
      tlfphone: value.Tlf,
      adressnew: value.Adress,
    });
    fetch("https://574e87637d42.ngrok.io/api/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        googleId: this.props.route.params.googleId,
        lastName: this.props.route.params.lastName,
        firstName: this.props.route.params.firstName,
        email: this.props.route.params.email,
        phone: value.Tlf,
        address: value.Adress,
      }),
    });
    this.componentDidMount();
    this.setState({
      display: "Info",
    });
  };

  showDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  closeDialog = () => {
    this.setState({ display: "Info" });
  };

  PutFirstname = (inputText) => {
    var ID = this.state.userId;
    {
      fetch("https://574e87637d42.ngrok.io/api/profile/" + this.state.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: inputText,
          googleId: this.state.dataSource.googleId,
          lastName: this.state.dataSource.lastName,
          phone: this.state.dataSource.phone,
          address: this.state.dataSource.address,
          email: this.state.dataSource.email,
        }),
      });
      this.setState({
        display: "Info",
      });
      this.componentDidMount();
    }
  };
  PutLastname = (inputText) => {
    var ID = this.state.userId;
    {
      fetch("https://574e87637d42.ngrok.io/api/profile/" + this.state.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: this.state.dataSource.firstName,
          googleId: this.state.dataSource.googleId,
          lastName: inputText,
          phone: this.state.dataSource.phone,
          address: this.state.dataSource.address,
          email: this.state.dataSource.email,
        }),
      });
      this.setState({
        display: "Info",
      });
      this.componentDidMount();
    }
  };
  PutEmail = (inputText) => {
    var ID = this.state.userId;
    {
      fetch("https://574e87637d42.ngrok.io/api/profile/" + this.state.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: this.state.dataSource.firstName,
          googleId: this.state.dataSource.googleId,
          lastName: this.state.dataSource.lastName,
          phone: this.state.dataSource.phone,
          address: this.state.dataSource.address,
          email: inputText,
        }),
      });
      this.setState({
        display: "Info",
      });
      this.componentDidMount();
    }
  };
  PutPhone = (inputText) => {
    var ID = this.state.userId;
    {
      fetch("https://574e87637d42.ngrok.io/api/profile/" + this.state.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: this.state.dataSource.firstName,
          googleId: this.state.dataSource.googleId,
          lastName: this.state.dataSource.lastName,
          phone: inputText,
          address: this.state.dataSource.address,
          email: this.state.dataSource.email,
        }),
      });
      this.setState({
        display: "Info",
      });
      this.componentDidMount();
    }
  };
  PutAddress = (inputText) => {
    var ID = this.state.userId;
    {
      fetch("https://574e87637d42.ngrok.io/api/profile/" + this.state.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ID,
          firstName: this.state.dataSource.firstName,
          googleId: this.state.dataSource.googleId,
          lastName: this.state.dataSource.lastName,
          phone: this.state.dataSource.phone,
          address: inputText,
          email: this.state.dataSource.email,
        }),
      });
      this.setState({
        display: "Info",
      });
      this.componentDidMount();
    }
  };

  changeFirstName = () => {
    this.setState({ display: "FirstName" });
  };
  changeLastname = () => {
    this.setState({ display: "LastName" });
  };
  changeEmail = () => {
    this.setState({ display: "Email" });
  };
  changeTLF = () => {
    this.setState({ display: "TLF" });
  };
  changeAdress = () => {
    this.setState({ display: "Address" });
  };
  renderForm = () => {
    switch (this.state.display) {
      case "FirstName":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profil"}
              message={"Endre fornavn"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutFirstname(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );

      case "LastName":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profil"}
              message={"Endre etternavn"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutLastname(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );

      case "E-mail":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profil"}
              message={"Endre e-mail"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutEmail(inputText);
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
              title={"Profil"}
              message={"Endre telefon nummer"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutPhone(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );

      case "Address":
        return (
          <View>
            <DialogInput
              isDialogVisible={this.showdialognow}
              title={"Profil"}
              message={"Endre adresse"}
              hintInput={this.state.dataSource.firstName}
              submitInput={(inputText) => {
                this.PutAddress(inputText);
              }}
              closeDialog={this.closeDialog}
            ></DialogInput>
          </View>
        );

      case "Info":
        return (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                {/* Henter bilde for avatar. Kan endres senere for å hente bilde fra google bruker */}
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.props.route.params.picture,
                  }}
                />
              </View>

              <View style={styles.body}>
                <View style={styles.bodyContent}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Fornavn
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.changeFirstName}
                  >
                    <Text>{this.state.dataSource.firstName}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Etternavn
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.changeLastname}
                  >
                    <Text>{this.state.dataSource.lastName}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    E-mail
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.changeEmail}
                  >
                    <Text>{this.state.dataSource.email}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Tlf</Text>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.changeTLF}
                  >
                    <Text>{this.state.dataSource.phone}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Adress
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.changeAdress}
                  >
                    <Text>{this.state.dataSource.address}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case "NewUser":
        const Form = t.form.Form;

        const User = t.struct({
          Tlf: t.String,
          Adress: t.String,
          terms: t.Boolean,
        });
        return (
          <View style={styles.container}>
            <Text> Venligst inkluder telefonnummer og adresse! </Text>
            <Form
              ref={(c) => (this._form = c)}
              type={User}
              options={options} // pass the options via props
            />

            <Button title="Registrer deg!" onPress={this.handleSubmit} />
          </View>
        );
    }
  };

  render() {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header
          leftComponent={{
            icon: "home",
            color: "#fff",
            onPress: () => navigate("Home", { userId: this.state.userId }),
          }}
          centerComponent={{
            text: "Profil",
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
    Telefon: {
      placeholder: "909 90 909",
      error: "Uten telefonnummer, hvordan skal vi få tak i deg?",
    },
    Adresse: {
      placeholder: "eks. Jon Lilletuns vei 9, 4879 Grimstad",
      error: "VI trenger adressen din for å vite hvor vi skal levere",
    },
    terms: {
      label: "Aksepter vilkår",
    },
  },
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  container: {
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
    padding: 1,
    backgroundColor: "white",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 40,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: -130,
    marginBottom: 10,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 140,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 0,
    height: 45,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  text: {
    left: 40,
  },
});
