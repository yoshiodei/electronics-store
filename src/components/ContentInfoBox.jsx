import React from 'react';

export default function ContentInfoBox({ children }) {
  return (
    <div className="content-info-box">
      <h5 className="content-info-box__text">{ children }</h5>
    </div>
  );
}
