import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductLocationLoading from './ProductLocationLoading';
import { selectProductsState, setCoordinate } from '../../../redux/slice/productsSlice';

export default function ProductLocation() {
  const [product, setProduct] = useState({});
  const [mileDistance, setMileDistance] = useState(-1);
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
  }, []);

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

  const getItemDistance = () => {
    const { longitude, latitude } = userCoordinates;

    if ((longitude !== 0 && latitude !== 0) && !(product?.location?.coordinates?.latitude)) {
      const R = 6371; // Earth's radius in kilometers

      const lat1 = latitude;
      const lon1 = longitude;
      const lat2 = product?.location?.coordinates?.latitude;
      const lon2 = product?.location?.coordinates?.longitude;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * (Math.PI / 180))
          * Math.cos(lat2 * (Math.PI / 180))
          * Math.sin(dLon / 2)
          * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      const distanceInMiles = distance / 1.60934; // Convert distance from kilometers to miles

      setMileDistance(distanceInMiles);
    } else {
      setMileDistance(-1);
    }
  };

  useEffect(() => {
    if (userCoordinates.latitude === 0 && userCoordinates.longitude === 0) {
      fetchCurrentLocation();
    }
    getItemDistance();
  }, []);

  if (!product.location) {
    return (<ProductLocationLoading />);
  }

  return (
    <div className="product-location">
      <div className="product-location__location-name-div">
        <h6 className="product-location__title">Location</h6>
        <h3 className="product-location__name">
          {product?.location?.locationIsSet ? `${product?.location?.town}, ${product?.location?.state}` : 'location is unknown'}
        </h3>
      </div>
      <div className="product-location__product-distance-div">
        <h6 className="product-location__title">Item Distance</h6>
        <h3 className="product-location__distance">
          { (mileDistance !== -1 && !isNaN(mileDistance)) && (
          <p>
            <span>{mileDistance}</span>
            {' '}
            miles away
          </p>
          ) }
          { (mileDistance === -1 || isNaN(mileDistance)) && <p>Distance is Unknown</p>}
        </h3>
      </div>
    </div>
  );
}
