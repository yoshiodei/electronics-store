import React from 'react';
import { useSelector } from 'react-redux';
import ChatWallHeader from './components/ChatWallHeader';
import MessageList from './components/MessageList';
import ChatFooter from './components/ChatFooter';
import { selectChatState } from '../../redux/slice/chatSlice';
import { selectAuthState } from '../../redux/slice/authSlice';

export default function Main() {
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const {
    recipientName, recipientId, recipientImage,
  } = useSelector(selectChatState);

  return (
    <div className="chat-list__main-section">
      <ChatWallHeader recipientName={recipientName} recipientImage={recipientImage} />
      <MessageList uid={uid} recipientId={recipientId} recipientName={recipientName} />
      <ChatFooter recipientId={recipientId} uid={uid} />
    </div>
  );
}
