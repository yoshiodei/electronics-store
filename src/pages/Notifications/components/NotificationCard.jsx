import React from 'react';
import ReactTimeAgo from 'react-time-ago';

export default function NotificationCard({ message }) {
  return (
    <div className="notifications__card">
      <div className="notifications__card__heading-div">
        <div className="notifications__card__heading-icon-div"><i className="fa-solid fa-bell" /></div>
        <h5>{ message.heading }</h5>
      </div>
      <p className="notifications__card__message-text">{ message.messageText }</p>
      <p className="notifications__card__time mb-0"><ReactTimeAgo date={message.date} locale="en-US" /></p>
    </div>
  );
}
