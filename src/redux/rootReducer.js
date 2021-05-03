import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import productsReducer from './Products/products.reducer'
import cartReducer from './Cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer
})
