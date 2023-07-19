import React from 'react';

export default function UserOffline() {
  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>You are not connected to the internet</h2>
      <button
        type="button"
        className="tabs-custom__reload"
        onClick={() => window.location.reload()}
      >
        Click here to reload
      </button>
    </div>
  );
}
