import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import DisplayProductLoader from '../../Home/components/DisplayProductLoader';
import ProductCard from '../../../components/ProductCard';
import EmptyTab from './EmptyTab';
import InactiveItemProductCard from './InactiveItemProductCard';

export default function AllItemsTab({ setUserProductIds }) {
  const [products, setProducts] = useState({
    activeProducts: [],
    soldProducts: [],
    pendingProducts: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'products'),
        where('vendor.uid', '==', id),
        where('status', '==', 'active'),
      );
      const querySnapshot = await getDocs(q);
      const activeProductsArray = [];
      const soldProductsArray = [];
      const pendingProductsArray = [];
      const userProductIds = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activeProductsArray.push({ ...data, id: doc.id });
        userProductIds.push(doc.id);
      });

      const q2 = query(collection(db, 'soldProducts'), where('vendor.uid', '==', id));
      const querySnapshot2 = await getDocs(q2);

      querySnapshot2.forEach((doc) => {
        const data = doc.data();
        soldProductsArray.push({ ...data, id: doc.id });
      });

      const q3 = query(
        collection(db, 'products'),
        where('vendor.uid', '==', id),
        where('status', '==', 'pending'),
      );
      const querySnapshot3 = await getDocs(q3);

      querySnapshot3.forEach((doc) => {
        const data = doc.data();
        pendingProductsArray.push({ ...data, id: doc.id });
        userProductIds.push(doc.id);
      });

      setProducts({
        activeProducts: activeProductsArray,
        soldProducts: soldProductsArray,
        pendingProducts: pendingProductsArray,
      });

      setUserProductIds(userProductIds);

      setIsLoading(false);
    } catch (err) {
      console.log('error', err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (<DisplayProductLoader />);
  }

  if (products.activeProducts.length === 0
    && products.soldProducts.length === 0
    && products.pendingProducts.length === 0) {
    return (<EmptyTab />);
  }

  return (
    <div className="display-product-card">
      <div className="row g-2">
        {
      products.activeProducts.map((product) => (
        <div className="col-6 col-md-3">
          <ProductCard product={product} />
        </div>
      ))
      }
        {
      products.soldProducts.map((product) => (
        <div className="col-6 col-md-3">
          <InactiveItemProductCard product={product} sold pending={false} />
        </div>
      ))
      }
        {
      products.pendingProducts.map((product) => (
        <div className="col-6 col-md-3">
          <ProductCard product={product} />
        </div>
      ))
      }
      </div>
    </div>
  );
}
