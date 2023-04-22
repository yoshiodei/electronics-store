import React from 'react';
import { Link } from 'react-router-dom';

export default function AddPostCard() {
  return (
    <Link to="/new-item" className="add-post-card d-flex">
      <div className="add-post-card__icon-div d-flex">
        <i className="add-post-card__icon fa-solid fa-plus" />
        <h6 className="add-post-card__text">Add New Post</h6>
      </div>
    </Link>
  );
}
