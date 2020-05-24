import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Image
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';




class Products extends Component {

    constructor() {
        super();
        this.state = {
            sendInput: [],
            isDatePickerVisible: false,
            chosenDate: ''



        };
    }
    handlePressAdd= (item) =>{
        this.props.addItemToCart(item)
       };
    handlePressRemove=(item)=>{
        this.props.removeItem(item)
    }
    postOrderlist = () => {
        this.post(this.props.products)
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    };

    handleConfirm = (datetime) => {
        this.setState({
            chosenDate: moment(datetime).format('MMM, Do YYYY HH:mm')
        });
        this.hideDatePicker();


    };

    renderProducts = (products) => {

        return products.map((item, index) => {


            return (
                <View key={index} style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity   >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>{item.supplier}</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{item.productModel.productName}</Text>
                        <Text style={{ color: '#050', fontWeight: 'bold', fontSize: 20 }}>kr {item.price},-</Text>
                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Quantity: {item.quantity}</Text>
                        <Image
                            source={{
                                url: item.productModel.picture,
                            }}
                            style={{ width: 90, height: 90 }} />
                      
                            <Icon onPress={(val) => this.handlePressAdd(item)}
                            name="ios-add-circle" size={30} color={"green"} style={{ left: 100, bottom: 90 }} />
                             <Icon onPress={(val) => this.handlePressRemove(item)}
                            name="ios-remove-circle" size={30} color={"red"} style={{ left: 100, bottom: 70 }} />
                        

                    </TouchableOpacity>

                </View>
            )

        })
    }

    replacer(products) {
        const test = {};
        test.products = [];
        test.requestedTime = this.state.chosenDate; // Array
        var tprice = 0;

        for (var i = 0; i < products.length; i++) {
            const test2 = {};
            test2.productName = (products[i].productModel.productName);
            test2.quantity = (products[i].quantity)
            test2.priceFMF = (products[i].price)
            tprice += products[i].price * products[i].quantity

            test.products.push(test2);
            const json = JSON.stringify(test);
            console.log(json);

        }
        test.totalPrice = tprice





        return test

    }


    post = (products) => {


        fetch('https://f58d5968.ngrok.io/api/orderlist', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.replacer(products))

        })
        alert("Post successfully done!")
        console.log("A date has been picked: ", this.state.chosenDate);



    }


    render() {
        return (


            <ScrollView >

                {this.renderProducts(this.props.products)}
                <View>

                    <TouchableOpacity style={styles.button} onPress={this.showDatePicker}>
                        <Text style={styles.text}>Show Date Picker</Text>
                        <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onCancel={this.hideDatePicker}
                            onConfirm={this.handleConfirm}
                            mode={'datetime'}
                            is24Hour={true}


                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.post(this.props.products)}>
                        <Text style={styles.text} >Confirm Your Order</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payLoad: product }),
      removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payLoad: product })
    }
}
const mapStateToProps = (state) => {
    return{
        cartItems: state
    }
  }


export default connect(null, mapDispatchToProps)(Products)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {

        width: 60, height: 60,
        backgroundColor: '#61dafb',
        borderRadius: 50,
        flex: 1,
        bottom: 5,
        left: 60,
        flexDirection: 'column'

    },
    plus: {
        color: 'white',
        fontSize: 25,
        left: 17,
        fontSize: 40
    }, text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#61dafb',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15
    }
});