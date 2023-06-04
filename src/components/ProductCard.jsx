import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { db } from '../config/firebaseConfig';
import { toast } from 'react-toastify';
import { selectAuthState } from '../redux/slice/authSlice';
import { addToWhishList } from '../redux/slice/wishListSlice';

export default function ProductCard({ product }) {
  const {
    id, price, name, location, condition, isPromoted, image,
  } = product;

  const { isLoggedIn, docId } = useSelector(selectAuthState);
  // const { wishList } = useSelector(selectWishListState);
  const dispatch = useDispatch();

  const handleAddToWishList = async (wishListProduct) => {
    if (!isLoggedIn) {
      console.log('Log in to add items to wish list');
    } else {
      dispatch(addToWhishList({ ...wishListProduct, docId }));
      toast.success('Item added successfully!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
