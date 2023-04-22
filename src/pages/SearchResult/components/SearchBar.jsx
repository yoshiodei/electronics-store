import React from 'react';

export default function SearchBar() {
  return (
    <div className="search-bar d-flex">
      <div className="search-bar__input-div d-flex">
        <input className="search-bar__input" placeholder="what are you looking for?" />
        <button type="button" className="search-bar__button">Search</button>
      </div>
    </div>
  );
}
