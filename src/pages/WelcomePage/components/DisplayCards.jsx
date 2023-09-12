import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import ProductCard from '../../../components/ProductCard';
import Loader from '../../../components/Loader';
import EmptyDisplay from '../../../components/EmptyDisplay';
import UserOffline from '../../../components/UserOffline';
import { selectLocationState } from '../../../redux/slice/locationSlice';
import useGetUserLocation from '../hooks/useGetUserLocation';
import useItemsFetch from '../hooks/useItemsFetch';
import useFilterProductData from '../hooks/useFilterProductData';
import PaginationBar from '../../../components/PaginationBar';

export default function DisplayCards({ miles }) {
  const [itemsPerPage] = useState(32);

  const { filterObject } = useSelector(selectProductsState);
  const { updateTime: time } = filterObject;

  const { coordinates, isLocationAvailable } = useSelector(selectLocationState);
  const {
    fetchItems, data, isLoading, filteredData, setFilteredData,
  } = useItemsFetch();
  const { filterProductData, currentPage, setCurrentPage } = useFilterProductData(setFilteredData);

  useEffect(() => {
    useGetUserLocation();
  }, [isLocationAvailable]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterProductData(miles, coordinates);
  }, [data, time]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  if (!navigator.onLine) {
    return (
      <UserOffline />
    );
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
      <PaginationBar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        filteredData={filteredData}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
