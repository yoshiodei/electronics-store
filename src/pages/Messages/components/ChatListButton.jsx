import React from 'react';
import { useDispatch } from 'react-redux';
import profile from '../../../assets/images/profile.jpg';
import { SET_CHAT_DETAILS } from '../../../redux/slice/chatSlice';

export default function ChatListButton({ data, uid }) {
  const {
    firstName, photoURL, uid: recipientId,
  } = data.otherUserDetails;
  const dispatch = useDispatch();

  const chatDetailsData = {
    recipientId,
    recipientImage: photoURL,
    recipientName: firstName,
    chatRoomId: data.chatRoomId,
  };

  const lastMessage = data.lastMessage.message.length > 10
    ? data.lastMessage.message.trim().substring(0, 20).concat('...')
    : data.lastMessage.message;

  const myLastMessage = data.lastMessage.message.length > 10
    ? data.lastMessage.message.trim().substring(0, 17).concat('...')
    : data.lastMessage.message;

  const handleSetChat = async () => {
    dispatch(SET_CHAT_DETAILS(chatDetailsData));
  };

  return (
    <button
      type="button"
      className="chat-list__card"
      onClick={handleSetChat}
    >
      <div className="chat-list__card-inner-div">
        <div className="chat-list__card-image-div">
          <img src={photoURL || profile} alt="user profile" className="chat-list__card-image" />
        </div>
        <div className="chat-list__card-info-div">
          <h6>{ firstName }</h6>
          {uid !== data.lastMessage.senderId ? (<p>{lastMessage}</p>) : null}
          {uid === data.lastMessage.senderId ? (<p>{`You: ${myLastMessage}`}</p>) : null}
        </div>
      </div>
      { (data?.messageList?.length > 0) && (
      <div className="chat-list__new-message">
        <div className="chat-list__new-message__icon">
          <h6 className="chat-list__new-message__icon-value">New</h6>
        </div>
      </div>
      )}
    </button>
  );
}
