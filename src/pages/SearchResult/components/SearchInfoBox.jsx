import React from 'react';
import { useParams } from 'react-router-dom';

export default function SearchInfoBox() {
  const { searchName } = useParams();
  return (
    <div className="search-info-box">
      <h4>
        Search result for &ldquo;
        {searchName}
        &rdquo;
      </h4>
    </div>
  );
}
