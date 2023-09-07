import React from 'react';

export default function ChatListHeader() {
  return (
    <div className="chat-list__mobile-header">
      <h4>Chat List</h4>
      <input
        className="chat-list__header-input"
        placeholder="search by user name"
      />
    </div>
  );
}
