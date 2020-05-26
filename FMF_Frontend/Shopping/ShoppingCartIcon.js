import React from "react";
import{
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import {withNavigation} from 'react-navigation'
import Icon from  'react-native-vector-icons/Ionicons'
import { connect } from "react-redux"


const ShoppingCartIcon = (props) => (
    
    <View  style={[{padding:5}, Platform.OS == 'android' ? styles.iconContainer : null]}>
        <View style ={{
            position: 'absolute',
            height: 20,
            width:20,
            borderRadius: 15,
            backgroundColor: '#61dafb',
            right: 25,
            bottom: 20,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000


        }}>
            <Text style={{color: 'white', fontWeight:'bold'}}>
                {props.cartItems.length}
            </Text>
        
        </View>
        <Icon onPress= {() => {props.navigation.navigate('Cart'),{userId: userId}}} name ="ios-cart" size={30}/>
    </View>
)
const mapStateToProps = (state) => {
    return{
        cartItems: state,
    }
}


export default connect(mapStateToProps)(withNavigation(ShoppingCartIcon));


const styles = StyleSheet.create({
    contaier:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});