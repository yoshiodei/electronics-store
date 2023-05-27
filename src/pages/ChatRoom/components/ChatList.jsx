import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import ChatListButton from './ChatListButton';
import { db } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ChatList() {
  const [chatList, setChatList] = useState([]);
  const { docId } = useSelector(selectAuthState);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'vendors', docId), (docItem) => {
      setChatList(docItem.data().chatList);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="chat-list">
      <div className="chat-list__header">
        <h3>Chats</h3>
        <input
          type="text"
          placeholder="Search user by name"
          className="chat-list__header-input"
        />
      </div>
      <div className="chat-list__card-div">
        {(chatList.length === 0) && <h1 className="chat-list__list-empty">Chat List is empty</h1> }
        {
          (chatList.length !== 0)
          && (chatList.map((item) => (
            <ChatListButton data={item} />
          )))
        }
      </div>
    </div>
  );
}
