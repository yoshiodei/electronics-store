import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import Loader from '../../../components/Loader';
import EmptyDisplay from '../../../components/EmptyDisplay';
// import Pagination from '../../../components/Pagination';

export default function DisplaySearchItems() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage] = useState(32);
  const [isLoading, setIsLoading] = useState(false);
  const { searchName } = useParams('');

  const [currentPage, setCurrentPage] = useState(1);
  const {
    filterObject,
  } = useSelector(selectProductsState);

  const {
    updateTime: time, minPrice, maxPrice, condition, category,
  } = filterObject;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const q = query(
          collection(db, 'products'),
          where('isPromoted', '==', true),
        );
        const querySnapshot = await getDocs(q);
        const allProducts = [];
        querySnapshot.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        const q2 = query(
          collection(db, 'products'),
          where('isPromoted', '==', false),
        );
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          const queryData = doc.data();
          allProducts.push({ ...queryData, id: doc.id });
        });

        const filteredSearch = allProducts
          .filter((product) => (
            product.name?.toLowerCase().includes(searchName.toLowerCase())
          || product?.brand?.toLowerCase().includes(searchName.toLowerCase())
          || product?.category?.toLowerCase().includes(searchName.toLowerCase())
          ));

        setData(filteredSearch);
        setFilteredData(filteredSearch);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchName]);

  useEffect(() => {
    const filterData = async () => {
      try {
        const filtered = data.filter(
          (item) => (
            item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.category === category || category === 'all')
          ),
        );

        setFilteredData(filtered);
        setCurrentPage(1);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
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
    <>
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
    </>
  );
}
