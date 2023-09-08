import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';

export default function ChatListHeader({ recipientName, recipientImage, recipientId }) {
  const navigate = useNavigate();

  return (
    <div className="chat-list__mobile-header">
      <button
        type="button"
        className="chat-list__mobile-header__button"
        onClick={() => navigate('/chatlist/mobile')}
      >
        <i className="chat-list__mobile-header__button-icon fa-solid fa-chevron-left" />
        <h6>Chat List</h6>
      </button>
      {!recipientName && <h3>Message Board</h3> }
      { recipientName
      && (
      <div className="chat-list__mobile-header__user-info">
        <div className="chat-list__mobile-header__image-div">
          {(recipientImage === '') && (<img src={profile} alt="user profile" className="chat-list__mobile-header__image" />)}
          {!(recipientImage === '') && (<img src={profile} alt="user profile" className="chat-list__mobile-header__image" />)}
        </div>
        <Link className="h6" to={`/user-account/${recipientId}`}>{recipientName}</Link>
      </div>
      )}
    </div>
  );
}
