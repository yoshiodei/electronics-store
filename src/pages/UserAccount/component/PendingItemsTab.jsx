import React, { useEffect, useState } from 'react';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import DisplayProductLoader from '../../Home/components/DisplayProductLoader';
import EmptyTab from './EmptyTab';
import ProductCard from '../../../components/ProductCard';

export default function PendingItemsTab() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'products'),
        where('vendor.uid', '==', id),
        where('status', '==', 'pending'),
      );
      const querySnapshot = await getDocs(q);
      const allProducts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });
      setProducts(allProducts);
      setIsLoading(false);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (<DisplayProductLoader />);
  }

  if (products.length === 0) {
    return (<EmptyTab />);
  }

  return (
    <div className="display-product-card">
      <div className="row g-2">
        {
          products.map((product) => (
            <div className="col-6 col-md-3">
              <ProductCard product={product} />
            </div>
          ))
          }
      </div>
    </div>
  );
}
