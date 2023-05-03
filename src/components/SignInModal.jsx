import React from 'react';
import { Link } from 'react-router-dom';

export default function SignInModal() {
  return (
    <div className="modal fade" id="SignInModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close button-close-custom" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal__custom-content d-flex">
              <div className="modal__custom-content-left">
                <div>
                  <h2>Welcome Back</h2>
                  <div className="line" />
                  <p>Lorem ipsum ini dolor kalaam sai imei hasman kanal ini sur.</p>
                </div>
              </div>
              <div className="modal__custom-content-right">
                <form>
                  <input placeholder="Enter your email or mobile number" />
                  <input placeholder="Enter password" />
                  <Link to="/user-account" className="register-button">Sign In</Link>
                  <h6 className="switch-to-signin">
                    Don&apos;t have an account?
                    {' '}
                    <button className="switch-to-signin__button" type="button" data-bs-toggle="modal" data-bs-target="#SignUpModal">Register</button>
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
