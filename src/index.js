/* eslint-disable */
import React from 'react';
import '@stripe/stripe-js';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRoutes from './routes/MainRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json';
import { HelmetProvider } from 'react-helmet-async';

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
       <MainRoutes />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

