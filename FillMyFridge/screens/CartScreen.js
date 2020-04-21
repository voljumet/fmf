import React, {Component} from "react";
import{
    View,
    Text,
    StyleSheet
} from "react-native";
import {connect} from 'react-redux';


class CartScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                
                <Text> FUCK YOU</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        cartItems: state
    }
}


export default connect(mapStateToProps) (CartScreen);
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})