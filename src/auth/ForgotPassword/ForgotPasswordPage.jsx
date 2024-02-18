import React from 'react';
import AuthNav from '../components/AuthNav';
import AuthFooter from '../components/AuthFooter';
import Main from './Main';

export default function ForgotPasswordPage() {
  return (
    <div className="main-auth-div">
      <AuthNav />
      <Main />
      <AuthFooter />
    </div>
  );
}
