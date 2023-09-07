import React from 'react';
import ChatListHeader from './components/ChatListHeader';
import DisplayChatList from './components/DisplayChatList';

export default function Main({ uid }) {
  return (
    <div className="chat-list__main-section">
      <ChatListHeader />
      <DisplayChatList uid={uid} />
    </div>
  );
}
