import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const DonateButton = () => {
    return (
        <PayPalScriptProvider options={{ "client-id": "DIN_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons 
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '10.00' // Endre til ønsket beløp
                            },
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert('Donation successful!');
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default DonateButton;
