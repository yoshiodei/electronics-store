import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';

export default function CategoriesBox() {
  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    category: 'all',
    condition: 'all',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearFilter = (link) => {
    dispatch(setFilter({ ...initialFilter, updateTime: Date.now() }));
    navigate(link);
  };

  return (
    <div className="search__categories-box">
      <ul>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/phones')}>Phones</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/televisions')}>Televisions</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/desktops')}>Desktops</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/laptops')}>Laptops</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/headphones and speakers')}>Headphones and Speakers</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/game consoles')}>Game Consoles</button>
        </li>
        <li>
          <button type="button" onClick={() => handleClearFilter('/category/accessories')}>Accessories</button>
        </li>
      </ul>
    </div>
  );
}
