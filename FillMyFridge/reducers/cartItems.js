const cartItems  = (state = [] , action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return[...state, action.payLoad]

        case 'REMOVE_FROM_CART':
            return state.filter(cartItems=> cartItems.id !== action.payLoad.id)

    }
    return state
}

export default cartItems