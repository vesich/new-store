import { auth } from '../../firebase/utils'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { setProducts, fetchProductsStart } from './products.actions'
import productsTypes from './products.types'
import { handleAddProduct, handleDeleteProduct, handleFetchProducts } from './products.helpers'

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }) {

    try {
        const timestamp = new Date();

        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUid: auth.currentUser.uid,
            createdDate: timestamp
        });
        yield put(
            fetchProductsStart()
        );

    } catch (error) {
        //    console.log(error); 
    }
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts(payload)
        yield put(
            setProducts(products)
        );
    } catch (error) {
        // console.log(error);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );


    } catch (error) {
        //   console.log(error);  
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart)
    ])
}