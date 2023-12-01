import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
// addDoc, collection, doc, setDoc,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { selectAuthState } from '../../../redux/slice/authSlice';
// import useSetChatList from '../hooks/useSetChatList';
import useNewChat from '../hooks/useNewChat';
import SignUpModal from '../../../auth/Register/SignUpModal';
import SignInModal from '../../../auth/SignIn/SignInModal';

export default function StartChatButton({ recipientData }) {
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { photURL } = userInfo;
  const { isAnonymous } = loginInfo;
  const { uid } = loginInfo;
  const { vendor, name } = recipientData;
  const { id } = useParams();
  const newChat = useNewChat();

  const firstName = vendor?.displayName?.split(' ')[0];

  const textTemplate = `Hi ${firstName || ''}, I'm interested in the ${name} you have for sale and I would love to chat with you about it.`;

  const messageObject = {
    senderId: uid,
    image: photURL || '',
    displayName: vendor?.displayName?.split(' ')[0] || '',
    message: textTemplate,
    recipientId: vendor?.uid,
    itemName: recipientData.name,
    itemId: id,
  };

  // const { setChatList } = useSetChatList();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  const handleStartChat = async () => {
    setIsLoading(true);
    await newChat(messageObject);
    setIsLoading(false);
  };

  if (userIsAnonymous) {
    return (
      <>
        <button type="button" className="start-chat-button" title="message vendor" onClick={handleShowSignInModal}>
          <i className="fa-regular fa-message" />
          <h5>Start Chat</h5>
        </button>

        <SignUpModal
          handleShowRegisterModal={handleShowRegisterModal}
          showRegisterModal={showRegisterModal}
          handleCloseRegisterModal={handleCloseRegisterModal}
          handleShowSignInModal={handleShowSignInModal}
        />

        <SignInModal
          showSignInModal={showSignInModal}
          handleCloseSignInModal={handleCloseSignInModal}
          handleShowSignInModal={handleShowSignInModal}
          handleShowRegisterModal={handleShowRegisterModal}
        />
      </>
    );
  }

  return (
    <button
      type="button"
      className="start-chat-button"
      title="message vendor"
      onClick={handleStartChat}
    >

      {!isLoading ? (
        <>
          <i className="fa-regular fa-message" />
          <h5>Start Chat</h5>
        </>
      ) : (
        <>
          <i className="fa-regular fa-message" />
          <h5>...loading</h5>
        </>
      )}
    </button>
  );
}
