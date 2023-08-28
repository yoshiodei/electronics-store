import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { fillProductsList, selectProductsState } from '../../../redux/slice/productsSlice';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
import Loader from '../../../components/Loader';
import EmptyDisplay from '../../../components/EmptyDisplay';
import UserOffline from '../../../components/UserOffline';
import useGetItemsNearMe from '../../../Hooks/useGetItemsNearMe';
import { selectLocationState, setCoordinates } from '../../../redux/slice/locationSlice';
import GetLocation from './GetLocation';

export default function DisplayItemsNearMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(32);

  const dispatch = useDispatch();
  const isItemNearMe = useGetItemsNearMe();

  const { coordinates, itemMile, isLocationAvailable } = useSelector(selectLocationState);

  const { filterObject, productsList } = useSelector(selectProductsState);
  const {
    updateTime: time, maxPrice, minPrice, category, condition,
  } = filterObject;

  useEffect(() => {
    console.log('get position');
    if (!isLocationAvailable && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setCoordinates({ coordinates: { longitude, latitude }, isLocationAvailable: true }),
        );
      });
    }
    if (!navigator.geolocation) {
      console.log('can not get position');
    }
  }, [isLocationAvailable]);

  useEffect(() => {
    const fetchData = async () => {
      const loading = true;
      setIsLoading(loading);

      if (productsList.length > 1) {
        setData(productsList);
        setFilteredData(productsList);
      } else {
        try {
          const q = query(collection(db, 'products'), where('isPromoted', '==', true));
          const querySnapshot = await getDocs(q);
          const allProducts = [];
          querySnapshot.forEach((doc) => {
            const queryData = doc.data();
            allProducts.push({ ...queryData, id: doc.id });
          });

          const q2 = query(collection(db, 'products'), where('isPromoted', '==', false));
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {
            const queryData = doc.data();
            allProducts.push({ ...queryData, id: doc.id });
          });

          setData(allProducts);
          dispatch(fillProductsList(allProducts));
          setFilteredData(allProducts);
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = async () => {
      const loading = true;
      setIsLoading(loading);

      try {
        const filtered = data.filter(
          (item) => (
            item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (item.category === category || category === 'all')
        && isItemNearMe(item, coordinates, itemMile)
          ),
        );
        setFilteredData(filtered);
        setIsLoading(!loading);
        setCurrentPage(1);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    filterData();
  }, [data, time, itemMile]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!navigator.onLine) {
    return (<UserOffline />);
  }

  if (!isLocationAvailable) {
    return (<GetLocation />);
  }

  if (isLoading === true || data.length === 0) {
    return (<Loader />);
  }

  if (filteredData.length === 0) {
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
