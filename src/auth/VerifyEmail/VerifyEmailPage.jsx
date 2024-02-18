import React from 'react';
import Main from './Main';
import VerifyEmailNav from './components/VerifyEmailNav';
import VerifyEmailFooter from './components/VerifyEmailFooter';

export default function VerifyEmailPage() {
  return (
    <div className="main-auth-div">
      <VerifyEmailNav />
      <Main />
      <VerifyEmailFooter />
    </div>
  );
}
