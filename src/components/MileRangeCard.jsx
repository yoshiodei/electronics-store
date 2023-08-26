import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemMile } from '../redux/slice/locationSlice';

export default function MileRangeCard() {
  const [mileRange, setMileRange] = useState(5);
  const dispatch = useDispatch();

  const handleMileChange = (value) => {
    setMileRange(value);
    dispatch(setItemMile(mileRange));
  };

  return (
    <div className="mile-range__div">
      <h6>Mile Range</h6>
      <p className="mile-range__info">
        Find items within a
        {' '}
        <span>{mileRange}</span>
        {' '}
        mile range.
      </p>
      <div className="mile-range__input-div">
        <div className="mile-range__input-range-bar">
          <input
            type="range"
            min="1"
            max="15"
            step="1"
            value={mileRange}
            onChange={(e) => handleMileChange(e.target.value)}
          />
          <div className="mile-range__trail-line" style={{ right: `calc(${(100 - ((mileRange / 15) * 100))}% + 16px)` }} />
        </div>
      </div>
    </div>
  );
}
