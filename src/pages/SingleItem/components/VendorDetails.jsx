import React, { useEffect, useState } from 'react';
import {
  getDoc, doc,
} from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import VendorDetailLoading from './VendorDetailLoading';
import profile from '../../../assets/images/profile.jpg';

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

  if (!product?.location) {
    return (<VendorDetailLoading />);
  }

  if (!product?.vendor?.displayName) {
    return null;
  }

  return (
    <div className="vendor-details">
      <div className="vendor-details__info-div d-flex">
        <div className="vendor-details__profile-image-div">
          <img src={product?.vendor?.image || profile} alt="userImage" />
        </div>
        <div className="vendor-details__profile-info-div">
          <h6 className="vendor-details__profile-title">Vendor</h6>
          <Link to={`/user-account/${product?.vendor?.userId ? product?.vendor?.userId : product?.vendor?.uid}`}>
            <h5 className="vendor-details__profile-name">{product?.vendor?.displayName?.split(' ')[0]}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
