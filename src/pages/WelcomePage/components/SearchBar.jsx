import React from 'react';
import useSubmitSearch from '../hooks/useSubmitSearch';

export default function SearchBar() {
  const { handleSubmit, setSearch, search } = useSubmitSearch();

  return (
    <div className="welcome-page__form-div">
      <form className="welcome-page__form">
        <input
          className="welcome-page__input"
          placeholder="What are you looking for?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="welcome-page__search-button"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}
