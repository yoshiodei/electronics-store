import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryInfoBox() {
  const { category } = useParams();

  return (
    <div className="search-info-box">
      <h4 className="search-info-box__capitalize">{category}</h4>
    </div>
  );
}
