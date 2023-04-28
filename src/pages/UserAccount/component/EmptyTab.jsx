import React from 'react';

export default function EmptyTab() {
  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>There are no items in this tab</h2>
    </div>
  );
}
