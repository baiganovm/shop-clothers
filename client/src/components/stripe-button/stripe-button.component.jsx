import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_cshEuppaK38DNhfX15nWfTgD00tpPTGcz1';

    const onToken = token => {
        console.log(token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then((response) => {
            alert('Payment successful');
        }).catch(error => {
            console.log("Payment error: ", JSON.parse(error));
            alert('There was an issue with your payment. Please sure you use the provided credit card.')
        });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Baiganov IP'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />);
};

export default StripeCheckoutButton;
