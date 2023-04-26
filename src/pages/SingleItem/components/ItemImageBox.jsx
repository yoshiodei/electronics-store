import React from 'react';
import StartChatButton from './StartChatButton';

export default function ItemImageBox() {
  return (
    <div className="item-image-box">
      <div className="item-image-box__top-div">
        <StartChatButton />
      </div>
      <div className="item-image-box__bottom-div">
        <div className="item-image-box__bottom-div__image-div" />
        <div className="item-image-box__bottom-div__image-div" />
        <div className="item-image-box__bottom-div__image-div" />
        <div className="item-image-box__bottom-div__image-div" />
        <div className="item-image-box__bottom-div__image-div" />
      </div>
    </div>
  );
}
