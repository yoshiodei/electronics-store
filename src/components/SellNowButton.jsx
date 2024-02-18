import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/slice/authSlice';
import { errorToast } from '../utils/Toasts';
// import SignUpModal from '../auth/Register/SignUpModal';
// import SignInModal from '../auth/SignIn/SignInModal';

export default function SellNowButton() {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;
  const navigate = useNavigate();

  // const [showRegisterModal, setShowRegisterModal] = useState(false);
  // const [showSignInModal, setShowSignInModal] = useState(false);

  // const handleCloseRegisterModal = () => setShowRegisterModal(false);
  // const handleShowRegisterModal = () => setShowRegisterModal(true);
  // const handleCloseSignInModal = () => setShowSignInModal(false);
  // const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  const accessDenied = () => {
    errorToast('Please Log In to sell item');
    navigate('/sign-in');
  };

  if (!userIsAnonymous) {
    return (
      <Link to="/new-item" className="sell-now">
        <h6>Sell Now</h6>
      </Link>
    );
  }

  return (
    <>
      <button type="button" className="btn btn-primary sell-now" onClick={accessDenied}>
        Sell Now
      </button>

      {/* <SignUpModal
        handleShowRegisterModal={handleShowRegisterModal}
        showRegisterModal={showRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
      /> */}

      {/* <SignInModal
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
        handleShowSignInModal={handleShowSignInModal}
        handleShowRegisterModal={handleShowRegisterModal}
      /> */}
    </>
  );
}
