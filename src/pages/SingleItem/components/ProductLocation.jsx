import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import ProductLocationLoading from './ProductLocationLoading';

export default function ProductLocation() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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

  if (!product.location) {
    return (<ProductLocationLoading />);
  }

  return (
    <div className="product-location">
      <div className="product-location__location-name-div">
        <h6 className="product-location__title">Location</h6>
        <h3 className="product-location__name">{product.location}</h3>
      </div>
      <div className="product-location__product-distance-div">
        <h6 className="product-location__title">Item Distance</h6>
        <h3 className="product-location__distance">
          <span>3.2 </span>
          miles away
        </h3>
      </div>
    </div>
  );
}
