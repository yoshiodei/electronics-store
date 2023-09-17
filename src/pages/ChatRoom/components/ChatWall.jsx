import React, { useEffect, useState } from 'react';
import {
  doc, onSnapshot, updateDoc, arrayUnion, getDoc,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';
import ChatCard from './ChatCard';
import { RESET_CHAT_TEMPLATE, selectChatState } from '../../../redux/slice/chatSlice';
import { db } from '../../../config/firebaseConfig';

export default function ChatWall({ uid }) {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [messageSending, setMessageSending] = useState(false);
  const dispatch = useDispatch();

  const {
    userInfo,
  } = useSelector(selectAuthState);
  const { photoURL, displayName } = userInfo;
  const {
    recipientName, recipientId, recipientImage, chatTemplate,
  } = useSelector(selectChatState);

  const handleSetMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();

  //   const combinedId = (uid > recipientId) ? `${uid}${recipientId}` : `${recipientId}${uid}`;
  //   console.log('combineId is ==>', combinedId);

  //   const messageObject = {
  //     message,
  //     senderId: uid,
  //     recipientId,
  //     senderImage: photoURL,
  //     roomId: combinedId,
  //     timeStamp: Date.now(),
  //   };

  //   console.log('message object is ==>', messageObject);

  //   const senderChatList = {
  //     recipientId: uid,
  //     recipientImage: photoURL,
  //     recipientName: displayName,
  //   };

  //   console.log('recipient chat list is ==>', senderChatList);

  //   try {
  //     const senderRef = doc(db, 'vendors', uid);
  //     const recipientRef = doc(db, 'vendors', recipientId);

  //     setMessage('');
  //     e.target.reset();

  //     await updateDoc(senderRef, {
  //       messages: arrayUnion(messageObject),
  //     });

  //     await updateDoc(recipientRef, {
  //       chatList: arrayUnion(senderChatList),
  //     });

  //     await updateDoc(recipientRef, {
  //       messages: arrayUnion(messageObject),
  //     });

  //     await updateDoc(recipientRef, {
  //       newMessages: arrayUnion(recipientId),
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    setMessageSending(true);

    const combinedId = (uid > recipientId) ? `${uid}${recipientId}` : `${recipientId}${uid}`;

    const chatListObj = {
      recipientId: uid,
      recipientImage: photoURL,
      recipientName: displayName,
    };

    const messageObject = {
      message,
      senderId: uid,
      recipientId,
      senderImage: photoURL,
      roomId: combinedId,
      timeStamp: Date.now(),
    };

    try {
      const senderRef = doc(db, 'vendors', uid);
      const recipientRef = doc(db, 'vendors', recipientId);
      const docSnap = await getDoc(recipientRef);

      setMessage('');
      e.target.reset();

      if (docSnap.exists) {
        const chatList = docSnap.data().chatList || [];

        const filteredChatList = chatList.filter(
          (chatData) => chatData.recipientId !== chatListObj.recipientId,
        );

        const newChatList = [chatListObj, ...filteredChatList];

        await updateDoc(recipientRef, { chatList: newChatList });

        await updateDoc(senderRef, {
          messages: arrayUnion(messageObject),
        });

        await updateDoc(recipientRef, {
          messages: arrayUnion(messageObject),
        });

        await updateDoc(recipientRef, {
          newMessages: arrayUnion(recipientId),
        });
      }

      setMessageSending(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addTemplateMessage = async () => {
    const chatListObj = {
      recipientId: uid,
      recipientImage: photoURL,
      recipientName: displayName,
    };

    try {
      const senderRef = doc(db, 'vendors', uid);
      const recipientRef = doc(db, 'vendors', recipientId);

      const docSnap = await getDoc(recipientRef);

      if (docSnap.exists) {
        const chatList = docSnap.data().chatList || [];

        const filteredChatList = chatList.filter(
          (chatData) => chatData.recipientId !== chatListObj.recipientId,
        );

        const newChatList = [chatListObj, ...filteredChatList];

        await updateDoc(recipientRef, { chatList: newChatList });

        await updateDoc(senderRef, {
          messages: arrayUnion(chatTemplate),
        });

        await updateDoc(recipientRef, {
          messages: arrayUnion(chatTemplate),
        });

        await updateDoc(recipientRef, {
          newMessages: arrayUnion(recipientId),
        });
      }

      dispatch(RESET_CHAT_TEMPLATE);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (chatTemplate?.linkId) {
      addTemplateMessage();
    }
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'vendors', uid), (docItem) => {
      const combinedId = uid > recipientId ? `${uid}${recipientId}` : `${recipientId}${uid}`;
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
            <Link className="h4" to={`/user-account/${recipientId}`}>{recipientName}</Link>
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
            disabled={(!(message.trim().length > 0)) || messageSending}
          >
            {messageSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
