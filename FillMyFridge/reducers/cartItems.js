import {addItemToCart} from './cart.utils'


const cartItems  = (state = [] , action) => {
    switch(action.type){
        case 'REMOVE_FROM_CART':
            let existingItem = state.find(
                cartItem => cartItem.id === action.payLoad.id
            );
            if (existingItem){
                if (action.payLoad.quantity === 1){
                    return state.filter(cartItems => cartItems.id !== action.payLoad.id)
                }else{
                return state.map(cartItem =>
                    cartItem.id === action.payLoad.id
                    ? {...cartItem, quantity: cartItem.quantity -=1}
                    : cartItem
                    );
                }
            }



            
        
        case 'ADD_TO_CART':
            let existingCartItem = state.find(
                cartItem => cartItem.id === action.payLoad.id
            );
            if (existingCartItem){
                return state.map(cartItem =>
                    cartItem.id === action.payLoad.id
                    ? {...cartItem, quantity: cartItem.quantity +=1}
                    : cartItem 
                    );
            }else{
                return[...state,  {...action.payLoad, quantity: 1}]
            }
           


                


        
    }
    return state
}

export default cartItems