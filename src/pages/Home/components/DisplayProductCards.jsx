import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import DisplayProductLoader from './DisplayProductLoader';
import {
  SET_PRODUCTS_LIST,
  selectProductsState,
} from '../../../redux/slice/productsSlice';

export default function DisplayProductCards() {
  const [products, setProducts] = useState([]);
  const { productsList } = useSelector(selectProductsState);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
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

      setProducts(allProducts);
      dispatch(SET_PRODUCTS_LIST(products));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (productsList.length === 0) {
      console.log('is loaded');
      fetchData();
    } else {
      console.log('not loaded');
      setProducts(productsList);
    }
  }, []);

  if (!products.length > 0) {
    return (<DisplayProductLoader />);
  }

  return (
    <div className="row g-2">
      {
      products.map((product) => (
        <div className="col-6 col-md-3">
          <ProductCard product={product} />
        </div>
      ))
      }
    </div>
  );
}
