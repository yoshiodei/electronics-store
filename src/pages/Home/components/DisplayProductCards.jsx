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
  fillProductsList,
  selectProductsState,
} from '../../../redux/slice/productsSlice';
import Pagination from '../../../components/Pagination';

export default function DisplayProductCards() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    productsList,
    filterObject,
  } = useSelector(selectProductsState);
  const {
    maxPrice, minPrice, condition, category, location, updateTime,
  } = filterObject;
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoadingProducts(true);
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

      const filteredList = allProducts.filter((item) => (
        item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.location === location || location === 'all')
        && (item.category === category || category === 'all')
      ));

      setProducts(filteredList);
      dispatch(fillProductsList(filteredList));
      setIsLoadingProducts(false);
    } catch (err) {
      setIsLoadingProducts(false);
      setIsError(true);
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (productsList.length === 0) {
      fetchData();
    } else {
      console.log('is loaded', productsList);
      setProducts(productsList);
    }
  }, [updateTime]);

  if (isLoadingProducts) {
    return (<DisplayProductLoader />);
  }

  if (!isLoadingProducts && isError) {
    return (<div>Loading error, please reload.</div>);
  }

  if (!isLoadingProducts && products.length === 0 && !isError) {
    return (<div>Items are empty!</div>);
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
      {(products.lenght > 0) && <Pagination products={products} />}
    </>
  );
}
