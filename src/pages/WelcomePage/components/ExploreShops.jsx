import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import ShopCard from './ShopCard';
import { db } from '../../../config/firebaseConfig';
import Hero from './Hero';

export default function ExploreShops() {
  const [stores, setStores] = useState([]);

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
    <div className="welcome-page__explore-shops">
      <div className="welcome-page__explore-shops__main-div">
        <div className="welcome-page__explore-shops-div">
          <h6>Explore Shops</h6>
        </div>
        <div className="welcome-page__explore-shops__shop-div">
          {
            stores.map((store) => (
              <ShopCard store={store} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
