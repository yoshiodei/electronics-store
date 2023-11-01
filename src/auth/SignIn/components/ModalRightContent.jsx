import React from 'react';

export default function ModalRightContent() {
  return (
    <div className="modal__custom-content-right">
      <form
        // onSubmit={handleEmailPasswordSignIn}
        className="modal__custom-content-right-form"
      >
        <input
          required
          placeholder="Enter your phone number"
        //   value={email}
        //   onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
        //   required placeholder="Enter password"
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="register-button"
        >
          {/* {isLoading ? 'Loading...' : 'Sign In'} */}
        </button>
        <button
          type="button"
          className="modal__custom-content-right__forgot-password"
        //   onClick={handleForgotPasswordSwitch}
        >
          Forgot Password
        </button>
      </form>
      <p className="modal__custom-content-right__or-separator">-- or --</p>
      <button
        type="button"
        className="modal__custom-content-right__google-signin-button"
        // onClick={handleGoogleSignIn}
      >
        <i className="fa-brands fa-google" />
        {/* {googleLoading ? '...Loading' : 'Sign In With Google'} */}
      </button>
      <h6 className="switch-to-signin">
        Don&apos;t have an account?
        {' '}
        <button
          className="switch-to-signin__button"
          type="button"
        //   onClick={handleModalSwitch}
        >
          Register
        </button>
      </h6>
    </div>
  );
}
