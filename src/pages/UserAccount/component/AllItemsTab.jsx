import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import AddPostCard from './AddPostCard';
import DisplayProductLoader from '../../Home/components/DisplayProductLoader';
import ProductCard from '../../../components/ProductCard';
import { selectAuthState } from '../../../redux/slice/authSlice';
import EmptyTab from './EmptyTab';

export default function AllItemsTab() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { loginInfo: { uid } } = useSelector(selectAuthState);

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

      const q2 = query(collection(db, 'soldProducts'), where('vendorId', '==', id));
      const querySnapshot2 = await getDocs(q2);

      querySnapshot2.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });

      setProducts(allProducts);
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

  if (products.length === 0) {
    return (<EmptyTab />);
  }

  return (
    <div className="display-product-card">
      <div className="row g-2">
        { (uid === id)
            && (
            <div className="col-6 col-md-3">
              <AddPostCard />
            </div>
            )}
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
