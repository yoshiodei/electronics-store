import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';
import { SET_CHAT_DETAILS } from '../../../redux/slice/chatSlice';

export default function ChatListButton({ data }) {
  const { recipientName, recipientImage } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetChat = () => {
    dispatch(SET_CHAT_DETAILS(data));
    navigate('/chatwall/mobile');
  };

  return (
    <button
      type="button"
      className="chat-list__card"
      onClick={handleSetChat}
    >
      <div className="chat-list__card-inner-div">
        <div className="chat-list__card-image-div">
          <img src={recipientImage || profile} alt="user profile" className="chat-list__card-image" />
        </div>
        <div className="chat-list__card-info-div">
          <h5>{ recipientName }</h5>
        </div>
      </div>
    </button>
  );
}
