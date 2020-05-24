import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'




class Products extends Component {

    constructor() {
        super();
        this.state = {
            sendInput: [],
            isDatePickerVisible: false,
            chosenDate: ''
         


        };
    }
     showDatePicker = () => {
        this.setState({isDatePickerVisible : true})
      };
    
       hideDatePicker = () => {
        this.setState({isDatePickerVisible : false})
      };
       handleConfirm = (datetime) => {
        this.setState({
            chosenDate: moment(datetime).format('MMM, Do YYYY HH:mm')
        })
        this.hideDatePicker();
     
      };

    renderProducts = (products) => {

        return products.map((item, index) => {


            return (
                <View key={index} style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.onPress(item)}  >

                        <Text>{item.productModel.productName + " - "+"Price: " + item.price + " - " + " QTY: " + item.quantity} </Text>
                    </TouchableOpacity>
                    <View>
      <Button title="Show Date Picker" onPress={this.showDatePicker} />
      <DateTimePicker
        isVisible={this.state.isDatePickerVisible}
        onCancel={this.hideDatePicker}
        onConfirm={this.handleConfirm}
        mode={'datetime'}
        is24Hour= {true}
        
       
      />
    </View>
                </View>
            )

        })
    }

    replacer(products) {
        const test = {};
        test.products = [];
       
        var tprice = 0;
    
        for (var i= 0; i< products.length; i++){
            const test2 = {};
            test2.productName= (products[i].productModel.productName);
            test2.quantity = (products[i].quantity)
            test2.priceFMF  = (products[i].price)
            tprice  += products[i].price*products[i].quantity
            
            test.products.push(test2);
            const json = JSON.stringify(test);
            console.log(json);
            console.log("A date has been picked: ", this.state.chosenDate);
        }
        test.totalPrice = tprice
        test.requestedTime= this.state.chosenDate; // Array
        console.log (tprice);


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
            


    }


    render() {
        return (


            <ScrollView >

                {this.renderProducts(this.props.products)}
                <TouchableOpacity onPress={()=>this.post(this.props.products)} style={styles.btn}>
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }



}
export default Products;

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
    }
});