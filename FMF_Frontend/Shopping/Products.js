import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      isDatePickerVisible: false,
      chosenDate: "",
      isConfirmDisabled: true,
      currentUser: null,
    };
  }

  totalPriceCar = (products) => {
    var tprice = 0;

    for (var i = 0; i < products.length; i++) {
      tprice += products[i].price * products[i].quantity;
    }
    return tprice.toFixed(2);
  };

  DisableConfirmButton = () => {
    this.setState({ isConfirmDisabled: true });
  };
  EnableConfirmButton = () => {
    this.setState({ isConfirmDisabled: false });
  };

  handlePressAdd = (item) => {
    this.props.addItemToCart(item);
  };
  handlePressRemove = (item) => {
    this.props.removeItem(item);
  };
  postOrderlist = () => {
    this.post(this.props.products);
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = (datetime) => {
    this.setState({
      chosenDate: moment(datetime).format("MMM, Do YYYY HH:mm"),
    });
    this.hideDatePicker();

    this.EnableConfirmButton();
  };

  renderProducts = (products) => {
    return products.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "black",
            paddingTop: 20,
            width: "80%",
            alignContent: "center",
          }}
        >
          <TouchableOpacity style={{ width: 130, height: 100 }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                paddingLeft: 10,
              }}
            >
              {item.productModel.productName}
            </Text>

            <Image
              source={{
                uri: item.productModel.picture,
              }}
              style={{ width: 45, height: 45 }}
            />
            <Text
              style={{
                color: "#050",
                fontWeight: "bold",
                fontSize: 13,
                paddingLeft: 10,
              }}
            >
              kr {item.price},-
            </Text>

            <Icon
              onPress={(val) => this.handlePressAdd(item)}
              name="ios-add-circle"
              size={40}
              color={"green"}
              style={{ left: "90%", bottom: "95%" }}
            />
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 20,
                left: "130%",
                bottom: "95%",
              }}
            >
              {item.quantity}
            </Text>
            <Icon
              onPress={(val) => this.handlePressRemove(item)}
              name="ios-remove-circle"
              size={40}
              color={"red"}
              style={{ left: "90%", bottom: "95%" }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  replacer(products) {
    const test = {};
    test.products = [];
    test.requestedTime = this.state.chosenDate;
    test.shopper = {};
    test.shopper.firstName = this.state.currentUser.firstName;
    test.shopper.lastName = this.state.currentUser.lastName;
    test.shopper.address = this.state.currentUser.address;
    test.shopper.phone = this.state.currentUser.phone;
    test.available = true;

    var tprice = 0;

    for (var i = 0; i < products.length; i++) {
      const test2 = {};
      test2.productName = products[i].productModel.productName;
      test2.quantity = products[i].quantity;
      test2.priceFMF = products[i].price;
      tprice += products[i].price * products[i].quantity;

      test.products.push(test2);
      const json = JSON.stringify(test);
    }
    test.totalPrice = tprice;

    return test;
  }

  ProfileFetch = () => {
    fetch("https://574e87637d42.ngrok.io/api/profile/" + this.props.UserID)
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          currentUser: resJson,
        });
      })
      .catch((error) => {});
  };

  post = (products) => {
    this.ProfileFetch();
    if (this.state.isConfirmDisabled === true) {
      Alert.alert("Velg en dato!");
    } else {
      fetch("https://574e87637d42.ngrok.io/api/orderlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(this.replacer(products)),
      });
      Alert.alert("Handlelisten er lagt ut!");
      this.props.emptyCart();
      this.DisableConfirmButton();
    }
  };

  render() {
    this.ProfileFetch();
    return (
      <ScrollView
        style={{
          paddingHorizontal: Dimensions.get("window").width / 5,
          backgroundColor: "white",
        }}
      >
        {this.renderProducts(this.props.products)}
        <View>
          <TouchableOpacity style={styles.button} onPress={this.showDatePicker}>
            <Text style={styles.text}>Velg levering tidspunkt</Text>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onCancel={this.hideDatePicker}
              onConfirm={this.handleConfirm}
              mode={"datetime"}
              is24Hour={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.post(this.props.products)}
          >
            <Text style={styles.text}>Bekreft ordre</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 20,
              left: Dimensions.get("window").width / 9,
            }}
          >
            Totalt kr. {this.totalPriceCar(this.props.products)},-{" "}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch({ type: "ADD_TO_CART_TWO", payLoad: product }),
    removeItem: (product) =>
      dispatch({ type: "REMOVE_FROM_CART", payLoad: product }),
    emptyCart: () => dispatch({ type: "EMPTY_CART" }),
  };
};
const mapStateToProps = (state) => {
  return {
    cartItems: state,
  };
};

export default connect(null, mapDispatchToProps)(Products);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#3c6fb5",
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 15,
  },
});
