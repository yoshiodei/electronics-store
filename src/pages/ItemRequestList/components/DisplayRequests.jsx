import React, { useState } from 'react';
import RequestList from './RequestList';

export default function DisplayRequests() {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="request__search-bar-div">
        <input
          className="request__search-bar"
          placeholder="Filter by key word"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <RequestList search={search} />
    </>
  );
}
