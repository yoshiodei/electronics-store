import React from 'react';
import { Link } from 'react-router-dom';
import {
  doc, updateDoc, arrayUnion,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../config/firebaseConfig';
import { selectAuthState } from '../redux/slice/authSlice';
import { ADD_TO_WISHLIST, selectWishListState } from '../redux/slice/wishListSlice';

export default function ProductCard({ product }) {
  const {
    id, price, name, location, condition, isPromoted, image,
  } = product;

  const { docId, isLoggedIn } = useSelector(selectAuthState);
  const { wishList } = useSelector(selectWishListState);
  const dispatch = useDispatch();

  const handleAddToWishList = async (wishListProduct) => {
    if (!isLoggedIn) {
      try {
        const vendorRef = doc(db, 'vendors', docId);
        await updateDoc(vendorRef, {
          wishlist: arrayUnion(wishListProduct),
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const isFound = wishList.some((item, index) => {
        console.log(`test ${index} => ${item.id} vs ${wishListProduct.id}`);
        return item.id === wishListProduct.id;
      });
      console.log(`is found is ${isFound}`);
      if (!isFound) {
        dispatch(ADD_TO_WISHLIST(wishListProduct));
        console.log(wishList);
      } else {
        console.log('item is already in list');
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
