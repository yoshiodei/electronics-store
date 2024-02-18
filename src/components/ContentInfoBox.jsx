import React from 'react';

export default function ContentInfoBox({ children, subText }) {
  return (
    <div className="content-info-box">
      <h5 className="content-info-box__text">{ children }</h5>
      {subText && (<h6 className="content-info-box__sub-text">{ subText }</h6>)}
    </div>
  );
}
