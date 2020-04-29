import cartItems from './cartItems';
import { combineReducers } from 'redux';
 
const rootReducer = combineReducers({
    product: productReducer,
    cart: cartItems
});
 
export default rootReducer;