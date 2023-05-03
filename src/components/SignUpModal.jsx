import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpModal() {
  return (
    <div className="modal fade" id="SignUpModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close button-close-custom" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal__custom-content d-flex">
              <div className="modal__custom-content-left">
                <div>
                  <h2>Welcome</h2>
                  <div className="line" />
                  <p>Create an account today and start selling now on our amazing platform.</p>
                </div>
              </div>
              <div className="modal__custom-content-right">
                <form>
                  <input placeholder="Enter first name" />
                  <input placeholder="Enter last name" />
                  <input placeholder="Enter your email" />
                  <input placeholder="Enter your mobile number" />
                  <input placeholder="Enter password" />
                  <input placeholder="Confirm password" />
                  <div className="check-box-div">
                    <input type="checkbox" />
                    <h6>By checking this box I agree to all the terms and conditions</h6>
                  </div>
                  <Link to="/user-account" className="register-button">Register</Link>
                  <h6 className="switch-to-signin">
                    Already have an account?
                    {' '}
                    <button className="switch-to-signin__button" type="button" data-bs-toggle="modal" data-bs-target="#SignInModal">Sign In</button>
                  </h6>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
