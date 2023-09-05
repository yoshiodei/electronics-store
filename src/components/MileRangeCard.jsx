import React from 'react';

export default function MileRangeCard({ mileDistance, setMileDistance }) {
  const handleMileChange = (e) => {
    const value = parseInt(e.target.value);
    setMileDistance(value);
  };

  return (
    <div className="mile-range__div">
      <h6>Mile Range</h6>
      <p className="mile-range__info">
        Find items within a
        {' '}
        <span>{mileDistance}</span>
        {' '}
        mile range.
      </p>
      <div className="mile-range__input-div">
        <div className="mile-range__input-range-bar">
          <input
            type="range"
            className="mile-range__thumb"
            min="0"
            max="15"
            step="1"
            value={mileDistance}
            onChange={(e) => handleMileChange(e)}
          />
          <div className="mile-range__trail-line" style={{ right: `calc(${(100 - ((mileDistance / 15) * 100))}%)` }} />
        </div>
      </div>
    </div>
  );
}
