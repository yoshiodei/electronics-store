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

export default function AllItemsTab() {
  const [products, setProducts] = useState([]);
  const { id } = useParams({});
  const { userId } = useSelector(selectAuthState);

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'products'), where('vendorId', '==', id));
      const querySnapshot = await getDocs(q);
      const allProducts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push(data);
      });
      setProducts(allProducts);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (products.length === 0) {
    return (<DisplayProductLoader />);
  }

  return (
    <div className="display-product-card">
      <div className="row g-2">
        { (userId === id)
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
