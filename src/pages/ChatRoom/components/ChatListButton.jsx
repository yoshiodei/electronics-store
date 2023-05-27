import React from 'react';
import { useDispatch } from 'react-redux';
import profile from '../../../assets/images/profile.jpg';
import { SET_CHAT_DETAILS } from '../../../redux/slice/chatSlice';

export default function ChatListButton({ data }) {
  const { recipientName, recipientImage } = data;
  const dispatch = useDispatch();

  const handleSetChat = () => {
    console.log('chat data', data);
    dispatch(SET_CHAT_DETAILS(data));
  };

  return (
    <button
      type="button"
      className="chat-list__card"
      onClick={handleSetChat}
    >
      <div className="chat-list__card-inner-div">
        <div className="chat-list__card-image-div">
          {(recipientImage === '')
          && (<img src={profile} alt="user profile" className="chat-list__card-image" />)}
          {!(recipientImage === '')
          && (<img src={recipientImage} alt="user profile" className="chat-list__card-image" />)}
        </div>
        <div className="chat-list__card-info-div">
          <h5>{ recipientName }</h5>
        </div>
      </div>
      {/* <div className="chat-list__card-new-message" /> */}
    </button>
  );
}
