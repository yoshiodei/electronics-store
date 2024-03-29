import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../redux/slice/authSlice';
import getItemDistanceFromUser from '../pages/SingleItem/utils/getItemDistanceFromUser';
import { selectProductsState } from '../redux/slice/productsSlice';
import AddToWishListButton from './AddToWishListButton';

export default function ProductCard({ product }) {
  const {
    id, price, vendor, name, condition, isPromoted, images,
    // brand,
  } = product;

  const image = images[0];
  // const postDate = datePosted?.seconds
  //   ? convertSecondsToHumanDate(datePosted?.seconds)
  //   : convertSecondsToHumanDate(datePosted);

  const { userCoordinates } = useSelector(selectProductsState);
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const [miles, setMiles] = useState('');

  // const dispatch = useDispatch();

  const distance = getItemDistanceFromUser(userCoordinates, product);

  useEffect(() => {
    setMiles(distance);
  }, [distance, userCoordinates.longitude, userCoordinates.latitude]);

  return (
    <div className="product-card" key={id}>
      <Link to={`/single-item/${id}`} className="product-card__link">
        <div className="product-card__image-div">
          <img src={image || ''} alt="product" className="product-card__image" />
        </div>
        <p className="product-card__product-name">{name}</p>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        {/* <div className="product-card__product-location-div d-flex align-items-center">
          <p className="product-card__product-location-name">{brand}</p>
        </div> */}
        <p className="product-card__product-mile-range">{parseInt(miles) >= 0 ? `${miles} miles away` : '' }</p>
        {/* <p className="product-card__product-post-date">{`posted on ${postDate}`}</p> */}
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { isPromoted && (
        <div className="product-card__promotion-div">
          <p className="product-card__promotion">promoted</p>
        </div>
        )}
      </Link>
      <AddToWishListButton
        userIsAnonymous={isAnonymous}
        uid={uid}
        vendor={vendor}
        id={id}
        name={name}
      />
    </div>
  );
}
