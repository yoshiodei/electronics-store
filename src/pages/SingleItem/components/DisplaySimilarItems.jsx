import {
  collection, getDocs, limit, orderBy, query, where,
} from '@firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebaseConfig';
import SectionHeader from '../../../components/SectionHeader';
import ProductCard from '../../../components/ProductCard';
import EmptyDisplay from '../../../components/EmptyDisplay';

export default function DisplaySimilarItems({ category, id }) {
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('isPromoted', 'desc'),
        limit(8),
      );

      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (doc.id !== id) { allProducts.push({ ...docData, id: doc.id }); }
      });

      setData(allProducts);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category, id]);

  if (data.length < 1) {
    return (
      <div>
        <SectionHeader>Similar Items</SectionHeader>
        <EmptyDisplay />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader>Similar Items</SectionHeader>
      <div className="row g-2">
        {
          data.map((product) => (
            <div className="col-6 col-sm-4 col-md-3">
              <ProductCard product={product} />
            </div>
          ))
          }
      </div>
    </div>
  );
}
