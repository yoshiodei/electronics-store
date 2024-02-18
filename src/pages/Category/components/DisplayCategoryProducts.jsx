import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
  orderBy,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import Loader from '../../../components/Loader';
import EmptyDisplay from '../../../components/EmptyDisplay';
import FilterByDistance from '../../WelcomePage/components/FilterByDistance';
import isItemWithinMiles from '../../WelcomePage/utils/isItemWithinMiles';
import { selectLocationState } from '../../../redux/slice/locationSlice';

export default function DisplayCategoryProducts() {
  const [data, setData] = useState([]);
  const { filterCategoryObject } = useSelector(selectProductsState);
  const {
    updateTime: time, maxPrice, minPrice, condition, brand,
  } = filterCategoryObject;
  const { coordinates, isLocationAvailable } = useSelector(selectLocationState);
  const [currentPage, setCurrentPage] = useState(1);
  const [miles, setMiles] = useState(70);
  const [itemsPerPage] = useState(32);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const q = query(
  //       collection(db, 'products'),
  //       where('category', '==', category),
  //       where('isPromoted', '==', true),
  //       where('status', '==', 'active'),
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const allProducts = [];
  //     querySnapshot.forEach((doc) => {
  //       const docData = doc.data();
  //       allProducts.push({ ...docData, id: doc.id });
  //     });

  //     const q2 = query(
  //       collection(db, 'products'),
  //       where('category', '==', category),
  //       where('isPromoted', '==', true),
  //       where('status', '==', 'pending'),
  //     );
  //     const querySnapshot2 = await getDocs(q2);
  //     querySnapshot2.forEach((doc) => {
  //       const docData = doc.data();
  //       allProducts.push({ ...docData, id: doc.id });
  //     });

  //     const q3 = query(
  //       collection(db, 'products'),
  //       where('category', '==', category),
  //       where('isPromoted', '==', false),
  //       where('status', '==', 'active'),
  //     );
  //     const querySnapshot3 = await getDocs(q3);
  //     querySnapshot3.forEach((doc) => {
  //       const docData = doc.data();
  //       allProducts.push({ ...docData, id: doc.id });
  //     });

  //     const q4 = query(
  //       collection(db, 'products'),
  //       where('category', '==', category),
  //       where('isPromoted', '==', false),
  //       where('status', '==', 'pending'),
  //     );
  //     const querySnapshot4 = await getDocs(q4);
  //     querySnapshot4.forEach((doc) => {
  //       const docData = doc.data();
  //       allProducts.push({ ...docData, id: doc.id });
  //     });
  //     console.log('this is crazy', allProducts);
  //     setIsLoading(false);
  //     setData(allProducts);
  //     setFilteredData(allProducts);
  //   } catch (err) {
  //     console.log(err.message);
  //     setIsLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const q = query(
        collection(db, 'products'),
        where('mainCategory', '==', category),
        orderBy('isPromoted'),
      );

      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        allProducts.push({ ...docData, id: doc.id });
      });

      console.log('this is crazy', allProducts);
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

  // const checkCategory = (selectedCategory, itemCategoryName) => {
  //   if (selectedCategory === 'all') {
  //     return true;
  //   }
  //   const isCategoryAvailable = subCategoriesObj[selectedCategory].includes(itemCategoryName);
  //   return isCategoryAvailable;
  // };

  useEffect(() => {
    const filterData = async () => {
      try {
        let filtered = [];

        if (isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.mainCategory === category || category === 'all')
        && (item.brand === brand || brand === 'all')
        && isItemWithinMiles(miles, coordinates, item)
            ),
          );
        }

        if (!isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.brand === brand || brand === 'all')
            ),
          );
        }

        setFilteredData(filtered);
        setCurrentPage(1);
      } catch (error) {
        console.log(error.message);
      }
    };

    filterData();
  }, [data, time, miles]);

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
    return (
      <>
        <FilterByDistance setMiles={setMiles} miles={miles} />
        <EmptyDisplay />
      </>
    );
  }

  return (
    <>
      <FilterByDistance setMiles={setMiles} miles={miles} />
      <div className="search-result-items">
        <div className="row g-2">
          {
      currentItems.map((product) => (
        <div className="col-6 col-sm-4 col-md-2">
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
    </>
  );
}
