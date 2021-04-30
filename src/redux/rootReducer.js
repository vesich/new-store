import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import productsReducer from './Products/products.reducer'

export default combineReducers({
    user: userReducer,
    productsData: productsReducer
})
