import { doc, setDoc } from '@firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import { addNewProduct } from '../../../redux/slice/productsSlice';

export default function PaymentSuccessCard() {
  const doneRef = useRef(null);
  const dispatch = useDispatch();

  const postItem = async () => {
    const promotedItemJSON = localStorage.getItem('promotedItem');

    if (promotedItemJSON) {
      const promotedItem = JSON.parse(promotedItemJSON);

      console.log('this is the promo item -->', promotedItem);

      await setDoc(doc(db, 'pendingItems', promotedItem.id), promotedItem);
      await setDoc(doc(db, 'products', promotedItem.id), promotedItem);

      dispatch(addNewProduct(promotedItem));

      localStorage.removeItem('promotedItem');
      window.location.reload();
    } else {
      console.log('no item found');
    }
  };

  useEffect(() => {
    postItem();

    const timer = setTimeout(() => {
      if (doneRef.current) {
        doneRef.current.classList.add('drawn');
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const svgStyle = {
    enableBackground: 'new 0 0 37 37',
  };

  const pathStyle = {
    fill: '#0cdcc7',
    stroke: '#07a796',
    strokeWidth: 3,
    strokeLinejoin: 'round',
    strokeMiterlimit: 10,
  };

  const polylineStyle = {
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 3,
    strokeLinejoin: 'round',
    strokeMiterlimit: 10,
  };

  const navigate = (url) => { window.location.href = url; };

  return (
    <div className="contain-div">
      <div className="congrats">
        <h1>
          Congratulations !
        </h1>
        <div className="done" ref={doneRef}>
          <svg
            version="1.1"
            id="tick"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 37 37"
            style={svgStyle}
            xmlSpace="preserve"
          >
            <path
              className="circ path"
              style={pathStyle}
              d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
            />
            <polyline
              className="tick path"
              style={polylineStyle}
              points="11.6,20 15.9,24.2 26.4,13.8 "
            />
          </svg>
        </div>
        <h6>
          Payment has been completed successfully.
        </h6>
        <h6>
          Congratulations your item has been posted successfully.
        </h6>
        <button
          className="contain-div__home-button"
          type="button"
          onClick={() => navigate('https://www.electrotoss.com')}
        >
          <h6>Back to Home</h6>
        </button>
      </div>
    </div>
  );
}
