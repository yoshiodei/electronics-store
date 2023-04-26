import React, { useState } from 'react';

export default function FilterCard() {
  const priceGap = 900;
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(7500);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < (maxPrice - priceGap)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > (minPrice + priceGap) && value <= 10000) {
      setMaxPrice(value);
    }
  };

  const handleMinTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < maxPrice) {
      setMinPrice(value);
    } else {
      setMinPrice(2500);
    }
  };

  const handleMaxTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > minPrice && value <= 10000) {
      setMaxPrice(value);
    } else {
      setMaxPrice(7500);
    }
  };

  return (
    <div className="filter-card">
      <div className="filter-card__location-div">
        <h6>Location</h6>
        <select className="form-select" aria-label="Default select example">
          <option selected>All</option>
          <option value="Near">Items near me (within 5 miles)</option>
        </select>
      </div>
      <div className="filter-card__price-range-div">
        <h6>Price Range</h6>
        <div className="filter-card__range-div">
          <div className="filter-card__price-input">
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={minPrice} onChange={handleMinTextChange} />
            </div>
            <div className="filter-card__separator">-</div>
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={maxPrice} onChange={handleMaxTextChange} />
            </div>
          </div>
          <div className="filter-card__slider">
            <div className="filter-card__progress" style={{ left: `${minPrice / 100}%`, right: `${100 - (maxPrice / 100)}%` }} />
          </div>
          <div className="filter-card__range-input">
            <input type="range" className="filter-card__range filter-card__range-min" min="0" max="10000" value={minPrice} step="100" onChange={handleMinPriceChange} />
            <input type="range" className="filter-card__range filter-card__range-max" min="0" max="10000" value={maxPrice} step="100" onChange={handleMaxPriceChange} />
          </div>
        </div>
      </div>
      <div className="filter-card__item-condition-div">
        <h6>Item Condition</h6>
        <div className="filter-card__item-condition-outer-div">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="condition" id="condition2" />
            <label className="form-check-label" htmlFor="condition2">
              All
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="condition" id="condition2" />
            <label className="form-check-label" htmlFor="condition2">
              Brand New
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="condition" id="condition2" />
            <label className="form-check-label" htmlFor="condition2">
              Slightly Used
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="condition" id="condition2" />
            <label className="form-check-label" htmlFor="condition2">
              Used
            </label>
          </div>
        </div>
      </div>
      <div className="filter-card__category-div">
        <h6>Category</h6>
        <select className="form-select" aria-label="Default select example">
          <option selected>All</option>
          <option value="Phones">Phones</option>
          <option value="Television">Television</option>
          <option value="Denver">Desktop</option>
        </select>
      </div>
      <div className="filter-card__reset-div d-flex justify-content-end">
        <h6 className="filter-card__reset-button">Reset</h6>
      </div>
    </div>
  );
}
