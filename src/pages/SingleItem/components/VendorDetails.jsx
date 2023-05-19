import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import VendorDetailLoading from './VendorDetailLoading';
import placeholderImage from '../../../assets/images/profile.jpg';

export default function VendorDetails() {
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
    return (<VendorDetailLoading />);
  }

  return (
    <div className="vendor-details">
      <div className="vendor-details__info-div d-flex">
        <div className="vendor-details__profile-image-div">
          {!product.image && <img src={placeholderImage} alt="user" />}
          {product.image && <img src={product.vendor.image} alt="user" />}
          <div className="vendor-details__online-indicator" />
        </div>
        <div className="vendor-details__profile-info-div">
          <h6 className="vendor-details__profile-title">Vendor</h6>
          <Link to={`/user-account/${product.vendor.userId}`}>
            <h5 className="vendor-details__profile-name">{product.vendor.displayName}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
