import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
// import Pagination from '../../../components/Pagination';

export default function DisplaySearchItems() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchName } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, 'products'), where('isPromoted', '==', true));
      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });

      const q2 = query(collection(db, 'products'), where('isPromoted', '==', false));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });

      console.log('display all', allProducts);

      const filteredProducts = allProducts
        .filter((product) => (
          product.name?.toLowerCase().includes(searchName.toLowerCase())
          || product?.brand?.toLowerCase().includes(searchName.toLowerCase())
          || product?.category?.toLowerCase().includes(searchName.toLowerCase())
        ));

      console.log('display all filtered', filteredProducts);

      setProducts(filteredProducts);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (<div>...Loading</div>);
  }

  return (
    <>
      <div className="row g-2">
        {
      products.map((product) => (
        <div className="col-6 col-md-3">
          <ProductCard product={product} />
        </div>
      ))
      }
      </div>
      {(products.length > 0) && <div />}
    </>
  );
}
