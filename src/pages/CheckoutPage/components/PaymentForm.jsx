import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addDoc, collection } from '@firebase/firestore';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import { db } from '../../../config/firebaseConfig';

const ToastSuccess = () => (
  toast.success('Your Item has been posted successfully!', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
);

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { promotedItem } = useSelector(selectProductsState);

  //   const [email, setEmail] = useState('');
  //   console.log('your email', email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addToPending = async () => {
    try {
      const productRef = collection(db, 'pendingItems');
      await addDoc(productRef, promotedItem);
      console.log('item was successfully added to pending Items');
    } catch (err) {
      console.log(err.message, 'item was not added to pending Items');
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    console.log('item to post', promotedItem);

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    console.log('clientSecret is ===', clientSecret);

    if (!clientSecret) {
      return;
    }

    console.log('retrieve payment');

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: 'http://localhost:3000/payment-success',
      },
      redirect: 'if_required',
    })
      .then((result) => {
        setIsLoading(true);
        if (result.error) {
          setMessage(result.error.message);
          setIsLoading(false);
        } else if (result?.paymentIntent && result?.paymentIntent.status === 'succeeded') {
          setMessage('Payment Successful');
          addToPending();
          navigate('/payment-success');
          ToastSuccess();
          setIsLoading(false);
        } else {
          setMessage('An unexpected error occurred.');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setMessage(error);
        console.log(error?.message);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form className="checkout__form" id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        type="submit"
        className="checkout__buttom"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="checkout__spinner" id="spinner" /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
