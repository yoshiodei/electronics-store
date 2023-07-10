import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
// import useCheckCloseItems from '../../../components/Hooks/useCheckCloseItems';

export default function DisplayCards() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(32);

  const { filterObject, userCoordinates } = useSelector(selectProductsState);
  const {
    updateTime: time, maxPrice, minPrice, location, category, condition,
  } = filterObject;

  useEffect(() => {
    const fetchData = async () => {
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
      setFilteredData(allProducts);
    };

    fetchData();
  }, []);

  // function goes here
  const itemWithin5miles = (product) => {
    if (!(product?.location?.coordinates)) {
      return false;
    }

    const R = 6371; // Earth's radius in kilometers

    const lat1 = userCoordinates.latitude;
    const lon1 = userCoordinates.longitude;
    const lat2 = product?.location?.coordinates?.latitude;
    const lon2 = product?.location?.coordinates?.longitude;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1 * (Math.PI / 180))
          * Math.cos(lat2 * (Math.PI / 180))
          * Math.sin(dLon / 2)
          * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const distanceInMiles = distance / 1.60934;

    return distanceInMiles <= 5;
  };

  useEffect(() => {
    const filtered = data.filter(
      (item) => (
        item.price >= minPrice
        && item.price <= maxPrice
        && (item.condition === condition || condition === 'all')
        && (itemWithin5miles(item) || location === 'all')
        && (item.category === category || category === 'all')
      ),
    );

    setFilteredData(filtered);
    console.log('filteredData -->', filteredData);
    setCurrentPage(1);
  }, [data, time]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  console.log('currentItems --->', currentItems);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
