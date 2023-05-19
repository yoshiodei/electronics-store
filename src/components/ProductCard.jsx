import React from 'react';
import { Link } from 'react-router-dom';
import {
  doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../config/firebaseConfig';
import { selectAuthState } from '../redux/slice/authSlice';

export default function ProductCard({ product }) {
  const {
    id, price, name, location, condition, isPromoted, image,
  } = product;

  const { docId, isLoggedIn } = useSelector(selectAuthState);

  const handleAddToWishList = async (wishListProduct) => {
    if (isLoggedIn) {
      try {
        const vendorRef = doc(db, 'vendors', docId);
        await updateDoc(vendorRef, {
          wishlist: arrayUnion(wishListProduct),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="product-card" key={id}>
      <Link to={`/single-item/${id}`} className="product-card__link">
        <div className="product-card__image-div">
          <img src={image} alt="product" className="product-card__image" />
        </div>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        <p className="product-card__product-name">{name}</p>
        <div className="product-card__product-location-div d-flex align-items-center">
          <i className="product-card__product-location-icon fa-solid fa-location-dot" />
          <p className="product-card__product-location-name">
            {location}
          </p>
        </div>
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { isPromoted && (
        <div className="product-card__promotion-div">
          <p className="product-card__promotion">promoted</p>
        </div>
        )}
      </Link>
      <button type="button" className="product-card__add-to-wish-list d-flex" onClick={() => handleAddToWishList(product)}>
        <i className="fa-sharp fa-regular fa-heart product-card__add-to-wish-list__icon" />
      </button>
    </div>
  );
}
