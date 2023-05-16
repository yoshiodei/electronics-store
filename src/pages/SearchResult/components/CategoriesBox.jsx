import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoriesBox() {
  const navigate = useNavigate();

  return (
    <div className="search__categories-box">
      <ul>
        <li>
          <button type="button" onClick={() => navigate('/category/phones')}>Phones</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/televisions')}>Televisions</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/desktops')}>Desktops</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/laptops')}>Laptops</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/headphones-and-speakers')}>Headphones and Speakers</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/gaming-consoles')}>Gaming Consoles</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/category/accessories')}>Accessories</button>
        </li>
      </ul>
    </div>
  );
}
