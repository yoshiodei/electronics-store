import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import DisplayProductLoader from '../../Home/components/DisplayProductLoader';
import ProductCard from '../../../components/ProductCard';
import EmptyTab from './EmptyTab';

export default function ActiveItemsTab() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, 'products'), where('vendorId', '==', id));
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
