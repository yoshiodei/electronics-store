import React, { useState } from 'react';
import { arrayUnion, doc, updateDoc } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ChatFooter({ recipientId, uid }) {
  const [message, setMessage] = useState('');
  const {
    userInfo,
  } = useSelector(selectAuthState);
  const { photoURL, displayName } = userInfo;

  const handleSetMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const combinedId = (uid > recipientId) ? `${uid}${recipientId}` : `${recipientId}${uid}`;
    console.log('combineId is ==>', combinedId);

    const messageObject = {
      message,
      senderId: uid,
      recipientId,
      senderImage: photoURL,
      roomId: combinedId,
      timeStamp: Date.now(),
    };

    console.log('message object is ==>', messageObject);

    const senderChatList = {
      recipientId: uid,
      recipientImage: photoURL,
      recipientName: displayName,
    };

    console.log('recipient chat list is ==>', senderChatList);

    try {
      const senderRef = doc(db, 'vendors', uid);
      const recipientRef = doc(db, 'vendors', recipientId);

      setMessage('');
      e.target.reset();

      await updateDoc(senderRef, {
        messages: arrayUnion(messageObject),
      });

      await updateDoc(recipientRef, {
        chatList: arrayUnion(senderChatList),
      });

      await updateDoc(recipientRef, {
        messages: arrayUnion(messageObject),
      });

      await updateDoc(recipientRef, {
        newMessages: arrayUnion(recipientId),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="chat-list__mobile-footer" onSubmit={handleSendMessage}>
      <input
        placeholder="type your message..."
        className="chat-list__mobile-footer__input"
        onChange={handleSetMessage}
      />
      <button
        type="submit"
        className="chat-list__mobile-footer__button"
        disabled={!(message.trim().length > 0)}
      >
        send
      </button>
    </form>
  );
}
