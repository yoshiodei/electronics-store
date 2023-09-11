import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ChatCard({ mssg }) {
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const isMe = uid === mssg.senderId;
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
        <Link to="/" className="chat-card__product-link h6">
          {'iPhone 13 Promax'.length > 15 ? 'iPhone 13 Promax'.slice(0, 14).trim().concat('...') : 'iPhone 13 Promax'}
        </Link>
        <p className="chat-card__message">
          {mssg.message}
        </p>
      </div>
    </div>
  );
}
