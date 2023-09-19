import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { db } from '../config/firebaseConfig';
import { toast } from 'react-toastify';
import { selectAuthState } from '../redux/slice/authSlice';
import { addToWhishList } from '../redux/slice/wishListSlice';
import getItemDistanceFromUser from '../pages/SingleItem/utils/getItemDistanceFromUser';
import { selectProductsState } from '../redux/slice/productsSlice';

export default function ProductCard({ product }) {
  const {
    id, price, vendor, name, location, condition, isPromoted, images,
  } = product;

  const image = images[0];

  const { userCoordinates } = useSelector(selectProductsState);
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const dispatch = useDispatch();

  const miles = getItemDistanceFromUser(userCoordinates, product);

  const handleAddToWishList = async (wishListProduct) => {
    if (isAnonymous || vendor.userId === uid) {
      console.log('did not add to wishlist');
    } else {
      dispatch(addToWhishList({ ...wishListProduct, uid, image }));
      console.log('your id is', uid);
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
          <img src={image || ''} alt="product" className="product-card__image" />
        </div>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        <p className="product-card__product-name">{name}</p>
        <div className="product-card__product-location-div d-flex align-items-center">
          <i className="product-card__product-location-icon fa-solid fa-location-dot" />
          <p className="product-card__product-location-name">
            {location?.locationIsSet ? `${location?.town}, ${location?.state}` : 'location is unknown'}
          </p>
        </div>
        <p className="product-card__product-mile-range">{miles >= 0 ? `${miles} miles away` : '' }</p>
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { isPromoted && (
        <div className="product-card__promotion-div">
          <p className="product-card__promotion">promoted</p>
        </div>
        )}
      </Link>
      <button type="button" className="product-card__add-to-wish-list d-flex" onClick={() => handleAddToWishList({ ...product, id })}>
        <i className="fa-sharp fa-regular fa-heart product-card__add-to-wish-list__icon" />
      </button>
    </div>
  );
}
