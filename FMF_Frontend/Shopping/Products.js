import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    Dimensions
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { TextInput } from "react-native-gesture-handler";




class Products extends Component {

    constructor() {
        super();
        this.state = {
            isDatePickerVisible: false,
            chosenDate: '',
            isConfirmDisabled: true



        };
    }
    totalPriceCar = (products) => {
        var tprice = 0;

        for (var i = 0; i < products.length; i++) {
            tprice += products[i].price * products[i].quantity
        }
        return tprice.toFixed(2);

    }

    DisableConfirmButton = () => {
        this.setState({ isConfirmDisabled: true })
    }
    EnableConfirmButton = () => {
        this.setState({ isConfirmDisabled: false })

    }


    handlePressAdd = (item) => {
        this.props.addItemToCart(item)
    };
    handlePressRemove = (item) => {
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

        this.EnableConfirmButton();


    };

    renderProducts = (products) => {

        return products.map((item, index) => {


            return (
            
                    <View key={index} style={{borderWidth: 1, borderColor: 'black', paddingTop:20, width:'80%',alignContent:'center'}}>

                    
                    <TouchableOpacity style={{  width: 130, height: 100 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, paddingLeft:10 }}>{item.productModel.productName}</Text>
                    
                        <Image
                            source={{
                                uri: item.productModel.picture,
                            }}
                            style={{ width: 45, height: 45  }}
                        />
                        <Text style={{ color: '#050', fontWeight: 'bold', fontSize: 13, paddingLeft:10  }}>kr {item.price},-</Text>

                      
                        

                        <Icon onPress={(val) => this.handlePressAdd(item)}
                            name="ios-add-circle" size={40} color={"green"} style={{ left:"90%", bottom: "95%"}} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, left:"130%", bottom: "95%"}}>{item.quantity}</Text>
                        <Icon onPress={(val) => this.handlePressRemove(item)}
                            name="ios-remove-circle" size={40} color={"red"} style={{ left:"90%", bottom: "95%" }} />
                            
                        
                      
                            


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
            // console.log(json);
            
        }
        test.totalPrice = tprice





        return test

    }


    post = (products) => {

        if (this.state.isConfirmDisabled === true) {
            Alert.alert("PLease Choose a date");
        } else {


            fetch('https://11403577.ngrok.io/api/orderlist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(this.replacer(products))
            })
            Alert.alert("Post successfully done!")
            console.log("A date has been picked: ", this.state.chosenDate);
            this.props.emptyCart();
            this.DisableConfirmButton();

        }


    }


    render() {
        
        return (


            <ScrollView style={{ paddingHorizontal: Dimensions.get("window").width/5, backgroundColor:'white' }} >
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

                    <TouchableOpacity style={styles.button} onPress={() => this.post(this.props.products)}  >
                        <Text style={styles.text} >Confirm Your Order</Text>
                    </TouchableOpacity>


                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, paddingTop: 20, left: Dimensions.get("window").width/9 }}>TOTAL: {this.totalPriceCar(this.props.products)},- kr </Text>
                    
                </View>

            </ScrollView>
        );
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART_TWO', payLoad: product }),
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payLoad: product }),
        emptyCart: () => dispatch({ type: 'EMPTY_CART' })
    }
}
const mapStateToProps = (state) => {
    return {
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

        width: 30, height: 30,
        backgroundColor: 'black',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 15

    },
    plus: {
        color: 'white',
        fontSize: 25,
        left: 6,
        bottom:11,
        fontSize: 40,

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