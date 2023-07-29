import React, { useEffect, useState } from 'react';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import DisplayProductLoader from '../../Home/components/DisplayProductLoader';
import EmptyTab from './EmptyTab';

export default function DisplayProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(32);
  const { id } = useParams({});

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
      setIsLoading(false);
      setProducts(allProducts);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  console.log('current Items ===>', currentItems);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading && products.length === 0) {
    return (<DisplayProductLoader />);
  }

  if (products.length === 0) {
    return (<EmptyTab />);
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
                Array.from({ length: Math.ceil(products.length / itemsPerPage) })
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
              disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
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
