import React, { useEffect, useState } from 'react';
import {
  doc, onSnapshot, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';
import ChatCard from './ChatCard';
import { selectChatState } from '../../../redux/slice/chatSlice';
import { db } from '../../../config/firebaseConfig';

export default function ChatWall() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const {
    userId, docId, displayName, userImage,
  } = useSelector(selectAuthState);
  const {
    recipientName, recipientId, recipientDocId, recipientImage,
  } = useSelector(selectChatState);

  const handleSetMessage = (e) => {
    const { value } = e.target;
    console.log(value);
    setMessage(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const combinedId = (userId > recipientId) ? `${userId}${recipientId}` : `${recipientId}${userId}`;

    const messageObject = {
      message,
      senderId: userId,
      recipientId,
      recipientDocId,
      senderImage: userImage,
      roomId: combinedId,
      timeStamp: Date.now(),
    };

    const recipientChatList = {
      recipientDocId: docId,
      recipientId: userId,
      recipientImage: userImage,
      recipientName: displayName,
    };

    try {
      const senderRef = doc(db, 'vendors', docId);
      const recipientRef = doc(db, 'vendors', recipientDocId);

      setMessage('');
      e.target.reset();

      await updateDoc(senderRef, {
        messages: arrayUnion(messageObject),
      });

      await updateDoc(recipientRef, {
        chatList: arrayUnion(recipientChatList),
      });

      await updateDoc(recipientRef, {
        messages: arrayUnion(messageObject),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'vendors', docId), (docItem) => {
      const combinedId = userId > recipientId ? `${userId}${recipientId}` : `${recipientId}${userId}`;
      const messageList = docItem.data().messages.filter((messageItem) => (
        messageItem.roomId === combinedId
      ));
      setChats(messageList);
      console.log(chats);
    });

    return () => {
      unsub();
    };
  }, [recipientName]);

  return (
    <div className="chat-wall">
      <div className="chat-wall__header">
        {!recipientName && <h3>Message Board</h3> }
        {
        recipientName
        && (
        <>
          <div className="chat-wall__header-image-div">
            {(recipientImage === '') && (<img src={profile} alt="user profile" className="chat-wall__header-image" />)}
            {!(recipientImage === '') && (<img src={profile} alt="user profile" className="chat-wall__header-image" />)}
          </div>
          <div className="chat-wall__header-user-info">
            <h4>{recipientName}</h4>
            {/* <p>last seen 10:35 am</p> */}
          </div>
        </>
        )
        }
      </div>
      <div className="chat-wall__main">
        {(chats.length === 0) && <h1>Chat List Is Empty</h1>}
        {(chats.length !== 0)
        && (chats.map((mssg) => (
          <ChatCard mssg={mssg} />
        )))}
      </div>
      <div className="chat-wall__footer d-flex">
        <form className="chat-wall__input-div d-flex" onSubmit={handleSendMessage}>
          <input
            className={message.trim().length > 0 ? 'chat-wall__input' : 'chat-wall__input disabled'}
            placeholder="type your message..."
            onChange={handleSetMessage}
          />
          <button
            className={message.trim().length > 0 ? 'chat-wall__button' : 'chat-wall__button disabled'}
            type="submit"
            disabled={!(message.trim().length > 0)}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
