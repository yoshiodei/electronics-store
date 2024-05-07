import React from 'react';
import ItemRequestButton from './ItemRequestButton';

export default function EmptyDisplay() {
  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>There are no items in the list</h2>
      <ItemRequestButton />
    </div>
  );
}
