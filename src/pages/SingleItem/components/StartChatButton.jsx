import React from 'react';
import { Link } from 'react-router-dom';

export default function StartChatButton() {
  return (
    <Link to="/chat-room" className="start-chat-button">
      <i className="fa-solid fa-messages" />
      <h5>Message Vendor</h5>
    </Link>
  );
}
