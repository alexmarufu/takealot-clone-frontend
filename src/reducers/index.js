import { combineReducers } from 'redux';
import authReducer from "./auth.reducer";
import cartReducer from './cart.reducer';
import productsReducer from "./products.reducer"
import orderReducer from './order.reducer';


const allReducers = combineReducers({
    auth: authReducer,
    product: productsReducer,   
    cart: cartReducer,
    orders: orderReducer
});

export default allReducers;