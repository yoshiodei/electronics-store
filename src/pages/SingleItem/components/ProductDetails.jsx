import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import ProductDetailLoading from './ProductDetailLoading';

export default function ProductDetail() {
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

  if (!product.name) {
    return (<ProductDetailLoading />);
  }

  return (
    <div className="product-detail">
      <div className="product-detail__product-name-div">
        <h6 className="product-detail__title">Product</h6>
        <h3 className="product-detail__name">
          {product.name}
        </h3>
      </div>
      <div className="product-detail__product-price-div">
        <h6 className="product-detail__title">Price</h6>
        <h3 className="product-detail__price">
          {product.price}
        </h3>
      </div>
      <div className="product-detail__product-condition-div">
        <h6 className="product-detail__title">Item Condition</h6>
        <h3 className="product-detail__condition">{product.condition}</h3>
      </div>
      <div className="product-detail__product-details-div">
        <h6 className="product-detail__title">Details</h6>
        <p className="product-detail__detail">
          {product.details}
        </p>
      </div>
    </div>
  );
}
