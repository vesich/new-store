import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { CountryDropdown } from 'react-country-region-selector'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'


import Forminput from '../forms/Forminput/Forminput'
import Button from '../forms/Button/Button';
import { apiInstance } from '../../Utils/Utils'
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors'
import { clearCart } from '../../redux/Cart/cart.actions'
import { saveOrderHistory } from '../../redux/Orders/orders.actions'


import './paymentdetails.scss'

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems
})

const PaymentDetails = () => {
    const history = useHistory();
    const stripe = useStripe();
    const dispatch = useDispatch();
    const elements = useElements();
    const { total, itemCount, cartItems } = useSelector(mapState)

    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if (itemCount < 1) {
            history.push('/dashboard')
        }
    }, [itemCount])

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        })
    }

    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        const cardElement = elements.getElement('card');

        if (
            !shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state ||
            !shippingAddress.postal_code || !shippingAddress.country || !billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state || !billingAddress.postal_code ||
            !billingAddress.country || !recipientName || !nameOnCard
        ) { return }

        apiInstance.post('/payments/create', {
            amount: total * 100,
            shipping: {
                name: recipientName,
                address: {
                    ...shippingAddress
                }
            }
        }).then(({ data: clientSecret }) => {
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then(({ paymentMethod }) => {
                stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                })
                    .then(({ paymentIntent }) => {

                        const configOrder = {
                            orderTotal: total,
                            orderItems: cartItems.map(item => {
                                const { documentId, productThumbnail, productName, productPrice, quantity } = item;
                                return {
                                    documentId,
                                    productThumbnail,
                                    productName,
                                    productPrice,
                                    quantity
                                }
                            })
                        }

                        dispatch(
                            saveOrderHistory(configOrder)
                        )
                    })
            })
        })
    }

    const configCardElement = {
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px'
            }
        },
        hidePostalCode: true
    }

    return (
        <div className='paymentDetails'>
            <form onSubmit={handleFormSubmit}>
                <div className="group">
                    <h2>
                        Shipping Address
                    </h2>
                    <Forminput
                        required
                        type="text"
                        value={recipientName}
                        name="recipientName"
                        handleChange={e => setRecipientName(e.target.value)}
                        placeholder="Recipient Name"
                    />

                    <Forminput
                        required
                        type="text"
                        handleChange={ev => handleShipping(ev)}
                        value={shippingAddress.line1}
                        name="line1"
                        placeholder="Line 1"
                    />

                    <Forminput
                        type="text"
                        handleChange={ev => handleShipping(ev)}
                        value={shippingAddress.line2}
                        name="line2"
                        placeholder="Line 2"
                    />

                    <Forminput
                        required
                        type="text"
                        handleChange={ev => handleShipping(ev)}
                        value={shippingAddress.city}
                        name="city"
                        placeholder="City"
                    />

                    <Forminput
                        required
                        type="text"
                        handleChange={ev => handleShipping(ev)}
                        value={shippingAddress.state}
                        name="state"
                        placeholder="State"
                    />

                    <Forminput
                        required
                        type="text"
                        handleChange={ev => handleShipping(ev)}
                        name="postal_code"
                        value={shippingAddress.postal_code}
                        placeholder="Postal Code"
                    />
                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            onChange={val => handleShipping({
                                target: {
                                    name: "country",
                                    value: val
                                }
                            })}
                            value={shippingAddress.country}
                            valueType="short"
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>
                        Billing Address
                    </h2>
                    <Forminput
                        required
                        handleChange={e => setNameOnCard(e.target.value)}
                        name="nameOnCard"
                        type="text"
                        value={nameOnCard}
                        placeholder="Name on Card"
                    />

                    <Forminput
                        required
                        handleChange={ev => handleBilling(ev)}
                        type="text"
                        name="line1"
                        value={billingAddress.line1}
                        placeholder="Line 1"
                    />

                    <Forminput
                        type="text"
                        handleChange={ev => handleBilling(ev)}
                        name="line2"
                        value={billingAddress.line2}
                        placeholder="Line 2"
                    />

                    <Forminput
                        required
                        type="text"
                        name="city"
                        handleChange={ev => handleBilling(ev)}
                        value={billingAddress.city}
                        placeholder="City"
                    />

                    <Forminput
                        required
                        type="text"
                        name="state"
                        handleChange={ev => handleBilling(ev)}
                        value={billingAddress.state}
                        placeholder="State"
                    />

                    <Forminput
                        required
                        type="text"
                        name="postal_code"
                        handleChange={ev => handleBilling(ev)}
                        value={billingAddress.postal_code}
                        placeholder="Postal Code"
                    />
                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: "country",
                                    value: val
                                }
                            })}
                            value={billingAddress.country}
                            valueType="short"
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>
                        Card Details
                    </h2>
                    <CardElement
                        options={configCardElement}
                    />
                </div>
                <Button
                    type='submit'
                > Pay now </Button>
            </form>
        </div>
    )
}

export default PaymentDetails;
