import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';

export default function ViewsBox({ uid }) {
  const { id } = useParams();
  const [viewCount, setViewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorId, setVendorId] = useState('');

  const fetchData = () => {
    setIsLoading(true);
    const docRef = doc(db, 'products', id);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          setVendorId(data?.vendorId);
          if (!data?.viewCount) {
            setViewCount(0);
          } else {
            setViewCount(data?.viewCount.length);
          }
        }
        setIsLoading(false);
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
          setIsLoading(false);
        },
      );
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading || ((uid !== vendorId))) {
    return null;
  }

  return (
    <div className="views-box">
      <div className="views-box__icon-div">
        <i className="fa-solid fa-eye" />
      </div>
      <h5 className="views-box__view-count">
        {viewCount}
        {' '}
        {(viewCount === 1) ? 'view' : 'views'}
      </h5>
    </div>
  );
}
