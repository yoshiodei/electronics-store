import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../../redux/slice/productsSlice';
import { vehicleCat } from '../../NewItem/components/vehicleCategoryObj';

export default function CarsCategoriesBox() {
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
        {
            vehicleCat.map((categories) => (
              <li>
                <button type="button" onClick={() => handleClearFilter(`/category/cars/${categories}`)}><h6>{categories}</h6></button>
              </li>
            ))
          }
      </ul>
    </div>
  );
}
