import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ChatCard({ mssg }) {
  const { userId } = useSelector(selectAuthState);
  const isMe = userId === mssg.senderId;
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [mssg.message]);

  return (
    <div
      ref={ref}
      className={isMe ? 'chat-card d-flex chat-card--alt' : 'chat-card d-flex'}
    >
      <div className="chat-card__image-div">
        {(mssg?.senderImage === '') && (<img src={profile} alt="user profile" className="chat-card__image" />)}
        {!(mssg?.senderImage === '') && (<img src={mssg.senderImage} alt="user profile" className="chat-card__image" />)}
      </div>
      <div className="chat-card__message-div">
        <p className="chat-card__message">
          {mssg.message}
        </p>
      </div>
    </div>
  );
}
