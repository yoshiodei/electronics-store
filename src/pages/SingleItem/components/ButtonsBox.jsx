import React from 'react';

export default function ButtonsBox() {
  return (
    <div className="buttons-box">
      <button type="button">
        <i className="fa-regular fa-heart" />
        <h6>Save</h6>
      </button>
      <button type="button">
        <i className="fa-regular fa-flag" />
        <h6>Report</h6>
      </button>
      <button type="button">
        <i className="fa-solid fa-arrow-up-right-from-square" />
        <h6>Share</h6>
      </button>
    </div>
  );
}
