import React from 'react';

export default function Carousel({ images }) {
  return (
    <div id="carouselExampleIndicators" className="carousel slide carousel__custom">
      <div className="carousel-inner">
        {
          images.map((itemImage, index) => (
            <div
              className={index === 0 ? 'carousel-item carousel-item__custom active' : 'carousel-item carousel-item__custom'}
            >
              <img src={itemImage} className="d-block" alt="product" />
            </div>
          ))
        }
      </div>
      {(images.length > 1) && (
      <button
        className="carousel-control-prev carousel__custom__button-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      )}
      {(images.length > 1) && (
      <button
        className="carousel-control-next carousel__custom__button-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
      )}
    </div>
  );
}
