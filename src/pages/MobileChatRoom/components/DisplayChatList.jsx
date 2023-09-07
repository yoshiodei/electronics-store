import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from '@firebase/firestore';
import EmptyDisplay from '../../../components/EmptyDisplay';
import ChatList from './ChatList';
import { db } from '../../../config/firebaseConfig';

export default function DisplayChatList({ uid }) {
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

  if (chatList.length === 0) {
    return (
      <div className="chat-list__display-chat">
        <EmptyDisplay />
      </div>
    );
  }

  return (
    <div className="chat-list__display-chat">
      <ChatList chatList={chatList} uid={uid} />
    </div>
  );
}
