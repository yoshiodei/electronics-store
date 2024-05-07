import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthState } from '../redux/slice/authSlice';
import { errorToast } from '../utils/Toasts';

export default function ItemRequestButton() {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;
  const navigate = useNavigate();

  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  const accessDenied = () => {
    errorToast('Please Log In to add a request item');
    navigate('/sign-in');
  };

  if (!userIsAnonymous) {
    return (
      <button
        type="button"
        className="tabs-custom__empty-div__button"
        onClick={() => navigate('/add-request-item')}
      >
        Let vendors know what you are looking for!
      </button>
    );
  }

  return (
    <button
      type="button"
      className="tabs-custom__empty-div__button"
      onClick={accessDenied}
    >
      Let vendors know what you are looking for!
    </button>
  );
}
