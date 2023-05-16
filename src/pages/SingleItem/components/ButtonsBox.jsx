import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import ButtonsBoxLoading from './ButtonsBoxLoading';

export default function ButtonsBox() {
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
    return (<ButtonsBoxLoading />);
  }

  return (
    <div className="buttons-box">
      <button type="button">
        <i className="fa-regular fa-heart" />
        <h6>Save</h6>
      </button>
      <button type="button">
        <i className="fa-regular fa-flag" />
        <h6>Report</h6>
      </button>
      <button type="button">
        <i className="fa-solid fa-arrow-up-right-from-square" />
        <h6>Share</h6>
      </button>
    </div>
  );
}
