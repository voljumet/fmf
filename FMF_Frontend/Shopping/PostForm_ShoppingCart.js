import React, {Component} from 'react'
import { View } from 'react-native-animatable'
import Products  from '../Shopping/Products';



class PostForm_ShoppingCart extends Component{
    constructor(props){
        super(props)
        this.state={
            product:{
                
                productname: this.props.cartItems.productname,
                quantity: this.props.cartItems.quantity
            }
            
        }
    }
   
    submitHandler = () =>{
        axios.post("https://11403577.ngrok.io/api/orderlist", this.state)
        .then(response => {
            console.log(response),
            console.log(this.state.productname)
        })
        .catch(error => {
            console.log(error)
        })
        

    }
}
export default PostForm_ShoppingCart