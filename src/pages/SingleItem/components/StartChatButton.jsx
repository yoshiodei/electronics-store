import React from 'react';
import { Link } from 'react-router-dom';

export default function StartChatButton() {
  return (
    <Link to="/chat-room" className="start-chat-button" title="message vendor">
      <i className="fa-regular fa-message" />
    </Link>
  );
}
