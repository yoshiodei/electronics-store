/* eslint-disable eqeqeq */
import {
  collection, getDocs, limit, query, where,
} from '@firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import SectionHeader from '../../../components/SectionHeader';
import ProductCard from '../../../components/ProductCard';
import EmptyDisplay from '../../../components/EmptyDisplay';

export default function DisplayUserItems({ displayName, vendorId }) {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    try {
      const q = query(
        collection(db, 'products'),
        where('vendor.uid', '==', vendorId),
        // orderBy('isPromoted', 'desc'),
        limit(8),
      );

      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        console.log('comparison', doc.id, id);
        const docData = doc.data();
        if (doc.id !== id) { allProducts.push({ ...docData, id: doc.id }); }
      });

      console.log('allProducts', allProducts);
      setData(allProducts);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  if (data.length < 1) {
    return (
      <div>
        <SectionHeader>
          {
            displayName?.split(' ')[0]
              ? `Other items sold by ${displayName?.split(' ')[0]}`
              : 'Other items sold by this vendor'
            }

        </SectionHeader>
        <EmptyDisplay />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader>
        {
            displayName?.split(' ')[0]
              ? `Other items sold by ${displayName?.split(' ')[0]}`
              : 'Other items sold by this vendor'
            }

      </SectionHeader>
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
