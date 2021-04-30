import productTypes from './products.types'

const INITIAL_STATE = {
    products: []
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case productTypes.SET_PRODUCTS:
            return {
                ...state,
                product: action.payload
            }
        default: 
        return state;
    }
}

export default productsReducer;