import React from 'react';
import appName from '../../../Constants/constantVariables';

export default function PrivacyPolicy() {
  return (
    <div>
      <h4>
        {appName}
        {' '}
        (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to
        protecting the privacy and security of your personal information.
        This Privacy Statement describes how we collect, use, and disclose
        personal information when you use our
        {' '}
        {appName}
        {' '}
        mobile application
        (the &ldquo;App&rdquo;) and the services offered through the App.
      </h4>

      <hr />
      <br />

      <h4>Information We Collect</h4>

      <p>
        Personal Information: When you use our App, we collect limited
        personal information such as your name, location, and login details.
        We do not collect any other personal information from users.
      </p>

      <h4>How We Use Your Information</h4>

      <p>
        We use the limited personal information collected to provide, personalize,
        and improve our services, including facilitating transactions, communicating
        with you, and customizing your experience.
      </p>

      <h4>Sharing Your Information</h4>

      <p>
        We do not handle transactions on our platform directly. All transactions are
        handled by a third-party payment processor called Stripe Inc. We do not have
        access to your payment information or handle any transaction-related data.
      </p>

      <h4>Your Choices</h4>

      <p>
        You can review and update your account information at any time. If you have
        any concerns about your privacy or data security, please contact us.
      </p>
    </div>
  );
}
