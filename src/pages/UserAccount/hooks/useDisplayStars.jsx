import React, { useEffect, useState } from 'react';

export default function useDisplayStars(rating) {
  const [stars, setStars] = useState([]);

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const starsArray = [];

    for (let i = 0; i < fullStars; i += 1) {
      starsArray.push('fa-solid fa-star active');
    }

    if (decimal >= 0.5) {
      starsArray.push('fa-regular fa-star-half-stroke active');
    } else if (decimal > 0) {
      starsArray.push('fa-solid fa-star');
    }

    const remainingStars = 5 - starsArray.length;
    for (let i = 0; i < remainingStars; i += 1) {
      starsArray.push('fa-solid fa-star');
    }

    console.log('starsArray', starsArray);
    setStars(starsArray);
  };

  useEffect(() => {
    renderStars();
  }, [rating]);

  return (
    <div className="user-detail-box__user-rating-div">
      {
        stars.map((s) => (
          <i className={s} />
        ))
    }
    </div>
  );
}
