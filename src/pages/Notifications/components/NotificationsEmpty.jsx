import React from 'react';
import { Link } from 'react-router-dom';

export default function NotificationsEmpty() {
  return (
    <div className="notifications__empty-div">
      <i className="fa-solid fa-bell" />
      <h2>You have no notifications</h2>
      <Link to="/"><h6>Go back to home</h6></Link>
    </div>
  );
}
