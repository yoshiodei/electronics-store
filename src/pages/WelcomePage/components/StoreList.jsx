import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import ShopCard from './ShopCard';
import Hero from './Hero';
import SectionHeader from '../../../components/SectionHeader';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const fetchStores = async () => {
    const q = query(collection(db, 'vendors'), where('isPremium', '==', true));
    const querySnapshot = await getDocs(q);
    const allStores = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      allStores.push(data);
    });

    setStores(allStores);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (stores.length < 1) {
    return (<Hero />);
  }

  return (
    <div>
      <SectionHeader>Explore Shops</SectionHeader>
      <div className="welcome-page__explore-shops__shop-outer-div">
        <div className="welcome-page__explore-shops__shop-div">
          {
      stores.map((store) => (
        <ShopCard store={store} />
      ))
    }
        </div>
      </div>
      <div className="request__hero-section-outer-div">
        <div className="request__hero-section-div">
          <h5 className="request__section__text">
            Check out what users are looking to buy.
          </h5>
          <button
            className="request__section__button home"
            type="button"
            onClick={() => navigate('/request-item-list')}
          >
            View Requests
          </button>
        </div>
      </div>
    </div>
  );
}
