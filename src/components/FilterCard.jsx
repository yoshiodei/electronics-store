import React from 'react';

export default function FilterCard() {
  return (
    <div className="filter-card">
      <div className="filter-card__location-div">
        <h6>Location</h6>
        <select className="form-select" aria-label="Default select example">
          <option selected>All</option>
          <option value="Texas">Boston</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Denver">Denver</option>
        </select>
      </div>
      <div className="filter-card__price-range-div">
        <h6>Price Range</h6>
        <input type="range" />
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
