import React from 'react';
import ChatCard from './ChatCard';

export default function ChatWall() {
  return (
    <div className="chat-wall">
      <div className="chat-wall__header">
        <h3>Chats</h3>
      </div>
      <div className="chat-wall__main">
        <ChatCard />
      </div>
      <div className="chat-wall__footer d-flex">
        <div className="chat-wall__input-div d-flex">
          <input className="chat-wall__input" placeholder="type your message..." />
          <button className="chat-wall__button" type="button">Send</button>
        </div>
      </div>
    </div>
  );
}
