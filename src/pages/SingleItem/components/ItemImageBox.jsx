import React from 'react';
import StartChatButton from './StartChatButton';
import Carousel from './Carousel';

export default function ItemImageBox() {
  return (
    <div className="item-image-box">
      <div className="item-image-box__top-div">
        <Carousel />
        <StartChatButton />
      </div>
      <div className="item-image-box__bottom-div">
        <div className="item-image-box__bottom-div__image-div active" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1" />
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4" />
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5" />
      </div>
    </div>
  );
}
