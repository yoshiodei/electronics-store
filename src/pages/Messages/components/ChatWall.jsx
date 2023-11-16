import React, { useEffect, useState } from 'react';
import {
//   useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addDoc, collection, doc, setDoc,
} from '@firebase/firestore';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';
import ChatCard from './ChatCard';
import {
//   RESET_CHAT_TEMPLATE,
  selectChatState,
} from '../../../redux/slice/chatSlice';
import { fetchMessages } from '../utils/fetchChatData';
import sendMessage from '../utils/sendMessage';
import { db } from '../../../config/firebaseConfig';

export default function ChatWall({ uid }) {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [messageSending, setMessageSending] = useState(false);
  //   const dispatch = useDispatch();

  const {
    userInfo,
  } = useSelector(selectAuthState);
  const { photoURL, displayName } = userInfo;
  const {
    recipientName, recipientId, recipientImage,
    // chatTemplate,
    chatRoomId: chatIndexId,
  } = useSelector(selectChatState);

  const handleSetMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setMessageSending(true);
    setMessage('');

    try {
      const lastMessageData = {
        index: [uid, recipientId].sort().join('-'),
        participants: [uid, recipientId],
        lastMessage: {
          createdAt: new Date(),
          image: photoURL,
          message,
          senderId: uid,
        },
      };

      const messageData = {
        createdAt: new Date(),
        image: photoURL,
        displayName,
        message,
        senderId: uid,
      };

      const chatId = await sendMessage(uid, recipientId);

      if (chatId) {
        await setDoc(doc(db, 'chats', chatId), lastMessageData);
        await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
      }

      setMessageSending(false);
    } catch (err) {
      console.log(err.message);
      setMessageSending(false);
    }
  };

  const chatRoomId = chatIndexId || 'empty';

  useEffect(() => {
    const unsub = fetchMessages(chatRoomId, setChats);

    return () => {
      unsub();
    };
  }, [recipientName]);

  return (
    <div className="chat-wall">
      <div className="chat-wall__header">
        {!recipientName && <h3>Message Board</h3> }
        {
        recipientName?.split(' ')[0]
        && (
        <>
          <div className="chat-wall__header-image-div">
            {
              (recipientImage === '')
              && (
                <Link to={`/user-account/${recipientId}`}>
                  <img src={profile} alt="user profile" className="chat-wall__header-image" />
                </Link>
              )
            }
            {
              !(recipientImage === '')
              && (
                <Link to={`/user-account/${recipientId}`}>
                  <img src={recipientImage} alt="user profile" className="chat-wall__header-image" />
                </Link>
              )
            }
          </div>
          <div className="chat-wall__header-user-info">
            <Link className="h4" to={`/user-account/${recipientId}`}>{recipientName?.split(' ')[0]}</Link>
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
            value={message}
            onChange={handleSetMessage}
          />
          <button
            className={message.trim().length > 0
              ? 'chat-wall__button' : 'chat-wall__button disabled'}
            type="submit"
            disabled={(!(message.trim().length > 0)) || messageSending}
          >
            {messageSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
