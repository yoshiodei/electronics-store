import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import ChatListButton from './ChatListButton';
import { db } from '../../../config/firebaseConfig';

export default function ChatList({ uid }) {
  const [chatList, setChatList] = useState([]);

  const resetNewMessages = async () => {
    try {
      const vendorRef = doc(db, 'vendors', uid);

      await updateDoc(vendorRef, {
        newMessages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    resetNewMessages();

    const notificationsJSON = localStorage.getItem('notificationsCounts');
    const notificationsData = JSON.parse(notificationsJSON);
    const dataJSON = JSON.stringify(
      { messageCount: 0, notificationCount: notificationsData.notificationCount },
    );
    localStorage.setItem('notificationsCounts', dataJSON);
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'vendors', uid), (docItem) => {
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
        {/* <input
          type="text"
          placeholder="Search user by name"
          className="chat-list__header-input"
        /> */}
      </div>
      <div className="chat-list__card-div">
        {(chatList.length === 0) && <h1 className="chat-list__list-empty">Chat List is empty</h1> }
        {
          (chatList.length !== 0)
          && (chatList.map((item) => ((item.recipientId !== uid)
            ? (
              <ChatListButton data={item} />
            ) : null)))
        }
      </div>
    </div>
  );
}
