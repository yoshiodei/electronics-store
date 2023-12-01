import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductLocationLoading from './ProductLocationLoading';
import { selectProductsState, setCoordinate } from '../../../redux/slice/productsSlice';
import getItemDistanceFromUser from '../utils/getItemDistanceFromUser';

export default function ProductLocation() {
  const [product, setProduct] = useState({});
  // const [mileDistance, setMileDistance] = useState(-1);
  const { id } = useParams();
  const { userCoordinates } = useSelector(selectProductsState);
  const dispatch = useDispatch();

  const fetchData = () => {
    const docRef = doc(db, 'products', id);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          console.log('product in details ==>', data);
          setProduct(data);
        }
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
        },
      );
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setCoordinate({ latitude, longitude }));
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (userCoordinates.latitude === 0 && userCoordinates.longitude === 0) {
      fetchCurrentLocation();
    }
  }, []);

  const miles = getItemDistanceFromUser(userCoordinates, product);

  if (!product.location) {
    return (<ProductLocationLoading />);
  }

  return (
    <div className="product-location">
      <div className="product-location__location-name-div">
        <h6 className="product-location__title">
          Location
        </h6>
        <h5 className="product-location__name">
          {product?.location?.town ? `${product?.location?.town}, ${product?.location?.state}` : 'location is unknown'}
        </h5>
      </div>
      { (parseInt(miles) >= 0) && (
      <div className="product-location__product-distance-div">
        <h6 className="product-location__title">Item Distance</h6>
        <h5 className="product-location__distance">
          <p className="product-location__miles-away">
            <span>{miles}</span>
            {' '}
            miles away
          </p>
        </h5>
      </div>
      ) }
    </div>
  );
}
