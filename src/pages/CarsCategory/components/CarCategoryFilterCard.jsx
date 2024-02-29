import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { emptyProductsList, setCoordinate, setCategoryFilter } from '../../../redux/slice/productsSlice';
import { vehiclesArray } from '../../NewItem/components/vehicleCategoryObj';

export default function CarCategoryFilterCard({ category }) {
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    condition: 'all',
  };

  const dispatch = useDispatch();
  const [getBrandsArray, setGetBrandsArray] = useState([]);
  const [filterObj, setFilterObj] = useState(initialFilter);

  const priceGap = 900;

  useEffect(() => {
    const getBrandArray = (categoryName) => {
      switch (categoryName) {
        case 'Motorcycles':
          return Object.keys(vehiclesArray.Motorcycles);
        case 'Cars & Trucks':
          return Object.keys(vehiclesArray['Cars & Trucks']);
        case 'Campers & RVs':
          return Object.keys(vehiclesArray['Campers & RVs']);
        case 'Boats & Marine':
          return Object.keys(vehiclesArray['Boats & Marine']);
        case 'Auto parts & Accessories':
          return Object.keys(vehiclesArray['Auto parts & Accessories']);
        case 'Powersport vehicles':
          return Object.keys(vehiclesArray['Powersport vehicles']);
        case 'Tires & Rims':
          return Object.keys(vehiclesArray['Tires & Rims']);
        case 'Trailers':
          return Object.keys(vehiclesArray.Trailers);
        default:
          return null;
      }
    };

    const brands = getBrandArray(category);

    setGetBrandsArray(brands);
  }, [category]);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < (filterObj.maxPrice - priceGap)) {
      setFilterObj({ ...filterObj, minPrice: value });
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > (filterObj.minPrice + priceGap) && value <= 10000) {
      setFilterObj({ ...filterObj, maxPrice: value });
    }
  };

  const handleMinTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value < filterObj.maxPrice) {
      setFilterObj({ ...filterObj, minPrice: value });
    } else {
      setFilterObj({ ...filterObj, minPrice: 0 });
    }
  };

  const handleMaxTextChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > filterObj.minPrice && value <= 10000) {
      setFilterObj({ ...filterObj, maxPrice: value });
    } else {
      setFilterObj({ ...filterObj, maxPrice: 10000 });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilterObj({ ...filterObj, [name]: value });
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setCoordinate({ latitude, longitude }));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const handleFilter = () => {
    if (filterObj.location !== 'all') { fetchCurrentLocation(); }
    dispatch(emptyProductsList());
    dispatch(setCategoryFilter({ ...filterObj, updateTime: Date.now() }));
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    e.target.reset();
    setFilterObj(initialFilter);
    dispatch(setCategoryFilter({ ...initialFilter, updateTime: Date.now() }));
  };

  return (
    <form className="filter-card" onSubmit={handleResetFilter}>
      {/* <div className="filter-card__location-div">
        <h6>Location</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="location"
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Near">Items near me (within 5 miles)</option>
        </select>
      </div> */}
      <div className="filter-card__price-range-div">
        <h6>Price Range</h6>
        <div className="filter-card__range-div">
          <div className="filter-card__price-input">
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={filterObj.minPrice} onChange={handleMinTextChange} />
            </div>
            <div className="filter-card__separator">-</div>
            <div className="filter-card__field">
              <span>$</span>
              <input type="number" className="filter-card__input" value={filterObj.maxPrice} onChange={handleMaxTextChange} />
            </div>
          </div>
          <div className="filter-card__slider">
            <div className="filter-card__progress" style={{ left: `${filterObj.minPrice / 100}%`, right: `${100 - (filterObj.maxPrice / 100)}%` }} />
          </div>
          <div className="filter-card__range-input">
            <input type="range" className="filter-card__range filter-card__range-min" min="0" max="10000" value={filterObj.minPrice} step="100" onChange={handleMinPriceChange} />
            <input type="range" className="filter-card__range filter-card__range-max" min="0" max="10000" value={filterObj.maxPrice} step="100" onChange={handleMaxPriceChange} />
          </div>
        </div>
      </div>
      <div className="filter-card__category-div">
        <h6>Item Condition</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="condition"
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="slightly used">Slightly Used</option>
          <option value="used">Used</option>
        </select>
      </div>
      <div className="filter-card__category-div">
        <h6>Brand</h6>
        <select
          className="form-select"
          aria-label="Default select example"
          name="brand"
          onChange={handleSelectChange}
        >
          {
            getBrandsArray?.map((brand) => (
              <option value={brand} key={brand}>{brand}</option>
            ))
          }
        </select>
      </div>
      <div className="filter-card__reset-div d-flex justify-content-between">
        <button
          type="button"
          className="filter-card__filter-button"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          type="submit"
          className="filter-card__reset-button"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
