import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import Button from '../forms/Button/Button'
import './productcard.scss'

const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({ }) => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { product } = useSelector(mapState);

    const { productName, productThumbnail, productPrice, productDesc } = product

    useEffect(() => {
        dispatch(
            fetchProductStart(productId)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, [])

    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className='productCard'>
            <div className="hero">
                <img src={productThumbnail} alt={productName} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn}> Add to cart</Button>
                        </div>
                    </li>
                    <li>
                      <span dangerouslySetInnerHTML={{ __html: productDesc}} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard;
