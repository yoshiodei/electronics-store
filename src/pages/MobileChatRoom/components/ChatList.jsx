import React from 'react';
import ChatListButton from './ChatListButton';

export default function ChatList({ chatList, uid }) {
  return (
    <>
      {chatList.map((item) => ((item.recipientId !== uid)
        ? (
          <ChatListButton data={item} uid={uid} />
        ) : null))}
    </>
  );
}
