import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import Loader from '../../../components/Loader';
import EmptyDisplay from '../../../components/EmptyDisplay';

export default function DisplayCategoryProducts() {
  const [data, setData] = useState([]);
  const { filterCategoryObject } = useSelector(selectProductsState);
  const {
    updateTime: time, maxPrice, minPrice, condition, brand,
  } = filterCategoryObject;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(32);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        where('isPromoted', '==', true),
        where('status', '!=', 'blocked'),
      );
      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        allProducts.push({ ...docData, id: doc.id });
      });

      const q2 = query(
        collection(db, 'products'),
        where('category', '==', category),
        where('isPromoted', '==', false),
        where('status', '!=', 'blocked'),
      );
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        const docData = doc.data();
        allProducts.push({ ...docData, id: doc.id });
      });

      setIsLoading(false);
      setData(allProducts);
      setFilteredData(allProducts);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    const filterData = async () => {
      try {
        const filtered = data.filter(
          (item) => (
            item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.brand === brand || brand === 'all')
          ),
        );
        setFilteredData(filtered);
        setCurrentPage(1);
      } catch (error) {
        console.log(error.message);
      }
    };

    filterData();
  }, [data, time]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (<Loader />);
  }

  if (!isLoading && filteredData.length === 0) {
    return (<EmptyDisplay />);
  }

  return (
    <div className="search-result-items">
      <div className="row g-2">
        {
      currentItems.map((product) => (
        <div className="col-6 col-md-3">
          <ProductCard product={product} />
        </div>
      ))
      }
      </div>
      <div className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          <li className="page-item pagination__prev-page-item">
            <button
              className="page-link"
              type="button"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {
            Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) })
              .map((_, index) => (
                <li className="page-item pagination__page-item">
                  <button
                    type="button"
                    className={currentPage === (index + 1) ? 'page-link active' : 'page-link'}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>

                </li>
              ))
           }
          <li className="page-item pagination__next-page-item">
            <button
              className="page-link"
              type="button"
              disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
