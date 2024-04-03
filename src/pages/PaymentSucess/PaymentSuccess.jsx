import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import Navbar from '../../components/Navbar';
// import Main from './Main';
// import Footer from '../../sections/Footer';
import { selectAuthState } from '../../redux/slice/authSlice';
import appName from '../../Constants/constantVariables';
import PaymentSuccessCard from './components/PaymentSuccessCard';

export default function PaymentSuccess() {
  const { isAnonymous } = useSelector(selectAuthState);
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

  return (
    <>
      <Helmet>
        <title>{`Payment Success | ${appName}`}</title>
        <meta
          name="description"
          content={`Your Marketplace for Vehicles and Electronic Gadgets.
          Discover the Best Deals, Connect with Sellers, and Trade with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/payment-success" />
      </Helmet>
      {/* <Navbar />
      <Main />
      <Footer /> */}
      <PaymentSuccessCard />
    </>
  );
}
