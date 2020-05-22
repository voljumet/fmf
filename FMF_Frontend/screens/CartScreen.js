import React, {Component} from "react";
import{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import {connect} from 'react-redux';
import SearchScreen  from './SearchScreen';
import Products  from '../Shopping/Products';




class CartScreen extends Component {
    render(){
        return(
            
            <View style={styles.container}>
                
            {this.props.cartItems.length > 0 ?
                <Products
                    onPress={this.props.removeItem}
                    products={this.props.cartItems} 
                 />
                    
                : <Text>No items in your cart</Text>
            }
            
        </View>
        );
      
        
    }
}



const mapStateToProps = (state) => {
    return{
        cartItems: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payLoad: product })
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (CartScreen);
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})