import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="search-bar d-flex">
      <form onSubmit={handleSubmit} className="search-bar__input-div d-flex">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar__input"
          placeholder="what are you looking for?"
        />
        <button type="submit" className="search-bar__button">Search</button>
      </form>
    </div>
  );
}
