import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { emptyProductsList, setCoordinate, setCategoryFilter } from '../../../redux/slice/productsSlice';

export default function CategoryFilterCard({ category }) {
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

  const brandArray = {
    'Computers & Tablets': ['all', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Toshiba', 'IBM', 'HP', 'LG', 'ViewSonic', 'NEC'],
    'Video Games & Consoles': ['all', 'Sony (PlayStation)', 'Microsoft (Xbox)', 'Nintendo', 'Sega', 'Valve (Steam)', 'Razer', 'Logitech', 'Corsair', 'Alienware', 'HyperX'],
    'Audio & Headphones': ['all', 'Bose', 'Sony', 'Sennheiser', 'Beats by Dre', 'JBL', 'Audio-Technica', 'Skullcandy', 'Bang & Olufsen', 'Shure', 'AKG'],
    'Office Electronics': ['all', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Toshiba', 'IBM', 'LG', 'HP', 'ViewSonic', 'NEC'],
    'Wearable Devices': ['all', 'Apple', 'Samsung', 'Fitbit', 'Garmin', 'Xiaomi', 'Huawei', 'Fossil', 'Amazfit', 'Suunto', 'Withings'],
    'Car Electronics': ['all', 'Pioneer', 'Sony', 'Kenwood', 'Alpine', 'JVC', 'Clarion', 'Garmin', 'TomTom', 'Harman Kardon', 'Blaupunkt'],
    'Cameras, Drones & Accessories': ['all', 'Nikon', 'Canon', 'Sony', 'Panasonic', 'Fujifilm', 'GoPro', 'DJI', 'Leica', 'Olympus', 'Pentax'],
    'Home Appliances': ['all', 'Whirlpool', 'LG Electronics', 'Samsung', 'General Electric (GE)', 'Maytag', 'KitchenAid', 'Bosch', 'Kenmore', 'Electrolux', 'Frigidaire'],
    'Cellphones & Accessories': ['all', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Nokia', 'Motorola'],
    Televisions: ['all', 'Samsung', 'LG', 'Sony', 'TCL', 'Panasonic', 'Vizio', 'Philips', 'Sharp', 'Hisense', 'Insignia'],
  };

  useEffect(() => {
    const getBrandArray = (categoryName) => {
      switch (categoryName) {
        case 'Computers & Tablets':
          return brandArray['Computers & Tablets'];
        case 'Video Games & Consoles':
          return brandArray['Video Games & Consoles'];
        case 'Audio & Headphones':
          return brandArray['Audio & Headphones'];
        case 'Office Electronics':
          return brandArray['Office Electronics'];
        case 'Wearable Devices':
          return brandArray['Wearable Devices'];
        case 'Car Electronics':
          return brandArray['Car Electronics'];
        case 'Cameras, Drones & Accessories':
          return brandArray['Cameras, Drones & Accessories'];
        case 'Home Appliances':
          return brandArray['Home Appliances'];
        case 'Cellphones & Accessories':
          return brandArray['Cellphones & Accessories'];
        case 'Televisions':
          return brandArray.Televisions;
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
