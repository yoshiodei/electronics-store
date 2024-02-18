import React from 'react';
import AuthNav from '../components/AuthNav';
import AuthFooter from '../components/AuthFooter';
import VerifyEmail from './components/VerifyEmail';

export default function VerifyEmailPage() {
  return (
    <div className="main-auth-div">
      <AuthNav />
      <VerifyEmail />
      <AuthFooter />
    </div>
  );
}
