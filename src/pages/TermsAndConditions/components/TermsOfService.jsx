import React from 'react';
import appName from '../../../Constants/constantVariables';

export default function TermsOfService() {
  return (
    <div>
      <h5>
        Welcome to
        {' '}
        {appName}
        , an online marketplace for buying and selling vehicles and electronic items.
        By using this platform, you
        agree to the following terms and conditions:
      </h5>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>User Eligibility:</h6>
        <p>
          Users must be at least 18 years of age to access and use
          {' '}
          {appName}
          .
          By registering or using the platform, users affirm that they have the legal
          {' '}
          capacity to enter into a binding agreement.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Account Creation:</h6>
        <p>
          Users must create an account to buy or sell on
          {' '}
          {appName}
          .
          The information provided during registration must be accurate and up-to-date.
          Users are responsible for maintaining the confidentiality of their account
          {' '}
          credentials and are liable for all activities conducted under their account.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Selling and Buying:</h6>
        <p>
          {appName}
          {' '}
          provides a platform for users to list and sell vehicles and electronic items.
          Sellers must ensure that the items listed are accurate, legal,
          {' '}
          and within their possession to sell.
          Buyers are responsible for verifying the items&apos;
          {' '}
          condition and authenticity before making a purchase.
          All transactions must be conducted in person to verify
          {' '}
          the items and complete the exchange.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Prohibited Items:</h6>
        <p>

          Users are not allowed to list or sell items that
          {' '}
          are illegal, stolen, counterfeit, or violate intellectual property rights.
          The following items are strictly prohibited on
          {' '}
          {appName}
          : weapons, drugs, hazardous materials, adult content, and any
          {' '}
          other items deemed inappropriate by
          {' '}
          {appName}
          .
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Content Guidelines:</h6>
        <p>
          Users must not post misleading, offensive, or fraudulent content on the platform.
          Nudiance reserves the right to remove any listings or content
          {' '}
          that violate our guidelines or infringe upon others&apos; rights.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Fees and Payments:</h6>
        <p>
          Creating an account and listing items on
          {' '}
          {appName}
          {' '}
          is free of charge.
          {appName}
          {' '}
          may charge a transaction fee for completed sales,
          {' '}
          the amount of which will be clearly communicated to users.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>User Conduct:</h6>
        <p>
          Users must treat each other with respect and refrain
          {' '}
          from engaging in any abusive, threatening, or harassing behavior.
          Any attempt to manipulate or exploit the platform for
          {' '}
          personal gain will result in the termination of the user&apos;s account.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Liability Limitation:</h6>
        <p>
          {appName}
          {' '}
          is not responsible for the quality,
          {' '}
          safety, or legality of the items listed on the platform.
          Users participate in transactions at their own risk
          {' '}
          and agree not to hold
          {' '}
          {appName}
          {' '}
          liable for any damages, losses,
          {' '}
          or disputes arising from their use of the platform.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Intellectual Property:</h6>
        <p>
          Users retain ownership of the content they post on
          {' '}
          {appName}
          {' '}
          but
          {' '}
          grant the platform a non-exclusive license to use,
          {' '}
          display, and distribute the content for promotional purposes.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Termination of Service:</h6>
        <p>
          {appName}
          {' '}
          reserves the right to suspend or terminate
          {' '}
          a user&apos;s account at any time if they violate these terms and
          {' '}
          conditions or for any other reason deemed necessary by
          {' '}
          {appName}
          .
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <div>
        <h6>Updates to Terms and Conditions:</h6>
        <p>
          {appName}
          {' '}
          may update these terms and conditions
          {' '}
          from time to time, and users will be notified of any changes.
          Continued use of the platform after the updates
          {' '}
          implies acceptance of the revised terms and conditions.
        </p>
      </div>
      <div className="terms-and-conditions__line" />
      <h5>
        By using
        {' '}
        {appName}
        , you acknowledge that you have read, understood, and agreed to
        {' '}
        these terms and conditions. If you do not agree with any part of these
        {' '}
        terms, please refrain from using the platform.
      </h5>
    </div>
  );
}
