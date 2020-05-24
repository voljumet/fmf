import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView
} from "react-native";
import axios from 'axios';
import DialogInput from 'react-native-dialog-input';




class Products extends Component {

    constructor() {
        super();
        this.state = {

            isDialogVisible: true,
            showDialog: true,
            sendInput: [],


        };
    }

    renderProducts = (products) => {

        return products.map((item, index) => {


            return (
                <View key={index} style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.onPress(item)}  >

                        <Text>{item.productName + " - " + item.priceFMF + " - " + " QTY: " + item.quantity} </Text>
                    </TouchableOpacity>
                </View>
            )

        })
    }

    replacer(products) {
        const test = {};
        test.products = []; // Array
        
        for (var i= 0; i< products.length; i++){
            const test2 = {};
            test2.productName= (products[i].productName);
            test2.quantity = (products[i].quantity)
            test.products.push(test2);


            const json = JSON.stringify(test);
            console.log(json);
            
        }
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