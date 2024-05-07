import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import appName from '../../../Constants/constantVariables';

export default function SupportandFAQs() {
  return (
    <div>
      <h5>
        Welcome to
        {' '}
        {appName}
        , an online marketplace for buying and selling Vehicles and electronic items.
        By using this platform, you
        agree to the following terms and conditions:
      </h5>
      <div className="terms-and-conditions__line" />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-item">
          <h3>How does the in-person meeting process work?</h3>
          <p>
            To arrange an in-person meeting, follow these steps:
          </p>
          <ol>
            <li>Agree on a mutually convenient location.</li>
            <li>Confirm the meeting details through secure messaging on our platform.</li>
            <li>Meet in a well-lit and public place, such as a coffee shop or shopping center.</li>
          </ol>
        </div>

        <div className="faq-item">
          <h3>Is it safe to meet in person for transactions?</h3>
          <p>
            While we prioritize safety, itapos; s important to take precautions.
            Always meet in public places during daylight hours, bring a friend if possible,
            and verify the identity of the other party.
            Avoid meeting in secluded or unfamiliar locations.
          </p>
        </div>
        <div className="faq-item">
          <h3>
            What payment methods are accepted?
          </h3>
          <p>
            We currently support cash transactions only.
            It&apos; s recommended to handle payments in person during the meeting.
            Never share sensitive financial information through our platform.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I ship the item instead of meeting in person?</h3>
          <p>
            Our platform is designed for in-person transactions only.
            This ensures a secure and transparent exchange of items.
            We encourage users to follow safety guidelines when meeting face-to-face.
          </p>
        </div>

        <div className="faq-item">
          <h3>
            How do I report suspicious activity?
          </h3>
          <p>
            If you encounter any suspicious behavior, please report it
            immediately through our platform.
            Our support team will investigate the issue promptly.
            Your safety is our top priority.
          </p>
        </div>
        <div className="faq-item">
          <h3>
            What if the item is not as described?
          </h3>
          <p>
            In the event that the received item does not match the description,
            contact our support team within 10am to 5pm (Mon-Friday).
            We will assist you in resolving the issue,
            which may include initiating a return or refund process.
          </p>
        </div>
        <div className="faq-item">
          <h3>
            How do I communicate with the buyer/seller before the meeting?
          </h3>
          <p>
            Utilize our secure messaging system to communicate with the other party
            before the meeting. Avoid sharing personal contact information until the
            meeting details are confirmed.
          </p>
        </div>
        <div className="faq-item">
          <h3>
            What information should I share with the other party before meeting?
          </h3>
          <p>
            Share a detailed description of the item, agree on a meeting location, and
            confirm the preferred method of contact.
            Avoid sharing personal information, such as home addresses or phone numbers,
            until you are comfortable.
          </p>
        </div>
        <div className="faq-item">
          <h3>
            How do I edit or delete my listing?
          </h3>
          <p>
            Log in to your account, go to your listings, and you&apos; ll
            find options to edit or delete each listing.
            Make sure to update your listing promptly if the item is
            sold or is no longer available.
          </p>
        </div>

        <div className="faq-item">
          <h3>
            Are there any fees for using the platform?
          </h3>
          <p>
            Currently, our platform is free to use. There are no listing fees or transaction fees.
            Any changes to our fee structure will be communicated to users in advance.
            We only charge a small fees for the promotion of items,
            for upgrading profile to a store.
          </p>
        </div>
      </div>
      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns, feel free to reach out to our support team:</p>
        <ul>
          <p style={{
            fontSize: '1.1em',
            margin: 0,
            lineHeight: 1,
            fontWeight: 500,
            color: 'black',
          }}
          >
            Email: admhelp@electrotoss.com
          </p>
        </ul>
        <div className="col-md-4">
          <p style={{ color: 'black' }}>Reach Us on our social media platforms</p>
          <div className="footer__socials-div d-flex">
            <a href="https://web.facebook.com/cirloz" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="facebook">
              <i className="footer__social-icon fa-brands fa-facebook-f" />
            </a>
            <a href="https://www.instagram.com/cirloz" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="instagram">
              <i className="footer__social-icon fa-brands fa-instagram" />
            </a>
            <a href="https://twitter.com/cirloz" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="twitter">
              <i className="footer__social-icon fa-brands fa-twitter" />
            </a>
            <a href="https://www.youtube.com/channel/UCUDgJq_u7d7A_i_2n6Ap-qg" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="youtube">
              <i className="footer__social-icon fa-brands fa-youtube" />
            </a>
          </div>
        </div>
      </div>
    </div>

  );
}
