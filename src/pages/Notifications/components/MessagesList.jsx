import React from 'react';
import NotificationCard from './NotificationCard';
// import NotificationCard from './NotificationCard';

export default function MessagesList({ data }) {
  const groupedMessages = data.reduce((acc, message) => {
    const {
      message: messageText, modifiedAt: date, heading,
    } = message;
    console.log('the message', message);
    const monthYear = new Date(date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push({ messageText, heading, date });

    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedMessages).reverse().map(([monthYear, messages]) => (
        <div key={monthYear} className="notifications__list-div">
          <h5 className="notifications__list-heading">{monthYear}</h5>
          <ul className="notifications__list">
            {messages.reverse().map((message) => (
              <NotificationCard message={message} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
