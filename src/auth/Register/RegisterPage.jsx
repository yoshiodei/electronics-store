import React from 'react';
import Main from './Main';
import AuthNav from '../components/AuthNav';
import AuthFooter from '../components/AuthFooter';

export default function RegisterPage() {
  return (
    <div className="main-auth-div">
      <AuthNav />
      <Main />
      <AuthFooter />
    </div>
  );
}
