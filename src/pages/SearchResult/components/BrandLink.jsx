import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLink({ BrandObj }) {
  const { name, link } = BrandObj;

  return (
    <Link to={`/search/${name}`} className="top-brands__brand-box">
      <div className="top-brands__image-div">
        <img
          className="top-brands__image"
          alt="brand logo"
          src={link}
        />
      </div>
      <h6>{name}</h6>
    </Link>
  );
}
