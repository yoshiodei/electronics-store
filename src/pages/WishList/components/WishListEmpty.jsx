import React from 'react';
import { Link } from 'react-router-dom';

export default function WishListEmpty() {
  return (
    <div className="wish-list__empty-div">
      <i className="fa-solid fa-heart" />
      <h2>You have no items in wish list</h2>
      <Link to="/"><h6>Go back to home</h6></Link>
    </div>
  );
}
