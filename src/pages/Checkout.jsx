import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api'; // your API service

//const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_live_51HUUM3EOP4pOajcs7MljjZx3jbmLfBP9Rvz27EjhtS1A8Zpxi5QkCl8MEnDUNcdE5KyGfkknkyf5FsoWp0T8p7bX00k5pTAggs");
const stripePromise =  loadStripe(import.meta.env.STRIPE_PUBLISHABLE_TEST_KEY || "pk_test_51HUUM3EOP4pOajcsnjkmy3veb4uW1rGjQxJIzMNX4psnUFXKFyqoFVuLReIrgn5nLEJHWpKot4UIMJh0uEa4bDkK00pQTpv3OL")

const Checkout = () => {

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        try {
            const response = await api.post('/stripe/create-checkout-session', {
                priceId: 'price_1QFLSrEOP4pOajcsU4AVvYzY', // your price ID
                customerEmail: 'customer@example.com', // replace with actual email
            });
            const { sessionId } = response.data;  // Adjusting for sessionId

            // Redirect to Stripe checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) console.error('Stripe checkout error:', error.message);
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
    <button onClick={handleCheckout}>
        Subscribe Now
    </button>
    );
}
export default Checkout
