import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import ChatCard from '../../ChatRoom/components/ChatCard';
import { db } from '../../../config/firebaseConfig';

export default function MessageList({ uid, recipientId, recipientName }) {
  const [chats, setChats] = useState([]);

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
    <div className="chat-list__mobile-message-list">
      <div className="chat-list__mobile-message-list__inner-div">
        {(chats.length === 0) && <h1>Chat List Is Empty</h1>}
        {(chats.length !== 0)
        && (chats.map((mssg) => (
          <ChatCard mssg={mssg} />
        )))}
      </div>
    </div>
  );
}
