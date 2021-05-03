import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../forms/Button/Button'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'

const Product = (product) => {
    const dispatch = useDispatch();
    const { documentId, productThumbnail, productName, productPrice } = product;

    if (!documentId || !productThumbnail || !productName || typeof productPrice === 'undefined') {
        return null
    }

    const configAddToCartBtn = {
        type: 'button'
    }

    const handleAddToCart = (product) => {
        if (!product) { return }
        dispatch(
            addProduct(product)
        )
    }

    return (
        <div className='product'>
            <div className='thumb'>
                <Link to={`/product/${documentId}`}>
                    <img src={productThumbnail} alt={productName} />
                </Link>

            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className='name'>
                            <Link to={`/product/${documentId}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className='price'>
                            ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to Cart
                        </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Product
