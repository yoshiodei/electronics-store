import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PaymentForm from './components/PaymentForm';
import Loader from '../../components/Loader';
import { selectAuthState } from '../../redux/slice/authSlice';
import appName from '../../Constants/constantVariables';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const stripeServer = 'https://tektoss-server-8bc33ee92a1f.herokuapp.com';

export default function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState('');
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;

  const navigate = useNavigate();
  useEffect(() => {
    if (isAnonymous) {
      navigate('/');
      toast.error('Access Denied: Unauthorized Page', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${stripeServer}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'product_promotion' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Helmet>
        <title>{`Checkout | ${appName}`}</title>
        <meta
          name="description"
          content={`Your Marketplace for Vehicles and Electronic Gadgets.
          Discover the Best Deals, Connect with Sellers, and Trade with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/checkoutform" />
      </Helmet>

      <div className="checkout__layout">
        <h2>Confirm Payment For Product Promotion</h2>
        {stripePromise && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm clientSecret={options.clientSecret} />
        </Elements>
        )}
        {!clientSecret && (<Loader />)}
      </div>
    </>
  );
}
