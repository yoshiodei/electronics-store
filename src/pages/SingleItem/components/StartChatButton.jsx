import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAuthState } from '../../../redux/slice/authSlice';
import useSetChatList from '../hooks/useSetChatList';
import RegisterModal from '../../../components/RegisterModal';
import SignInModal from '../../../components/SignInModal';

export default function StartChatButton({ recipientData }) {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const { setChatList } = useSetChatList();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  const handleStartChat = () => {
    setChatList(uid, recipientData);
  };

  if (userIsAnonymous) {
    return (
      <>
        <button type="button" className="start-chat-button" title="message vendor" onClick={handleShowSignInModal}>
          <i className="fa-regular fa-message" />
          <h5>Start Chat</h5>
        </button>

        <RegisterModal
          handleCloseRegisterModal={handleCloseRegisterModal}
          showRegisterModal={showRegisterModal}
          handleShowSignInModal={handleShowSignInModal}
        />
        <SignInModal
          handleCloseSignInModal={handleCloseSignInModal}
          showSignInModal={showSignInModal}
          handleShowRegisterModal={handleShowRegisterModal}
        />
      </>
    );
  }

  return (
    <button type="button" className="start-chat-button" title="message vendor" onClick={handleStartChat}>
      <i className="fa-regular fa-message" />
      <h5>Start Chat</h5>
    </button>
  );
}
