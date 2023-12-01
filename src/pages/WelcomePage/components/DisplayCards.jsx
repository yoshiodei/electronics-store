import React, { useState } from 'react';
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
import FilterByDistance from './FilterByDistance';
// import FindItemsSlider from './FindItemsSlider';

export default function DisplayCards() {
  const { filterObject } = useSelector(selectProductsState);
  const { updateTime: time } = filterObject;

  const [filteredData, setFilteredData] = useState([]);
  const [miles, setMiles] = useState(70);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(32);

  const { coordinates, isLocationAvailable } = useSelector(selectLocationState);

  useGetUserLocation(isLocationAvailable);
  useItemsFetch(setIsLoading, setFilteredData, setData, isLocationAvailable);
  useFilterProductData(
    data,
    setFilteredData,
    setCurrentPage,
    isLocationAvailable,
    miles,
    coordinates,
    time,
    setIsLoading,
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  if (!navigator.onLine) {
    return (
      <UserOffline />
    );
  }

  if (isLoading === true && data.length === 0) {
    return (<Loader />);
  }

  if (filteredData.length === 0) {
    return (
      <>
        <FilterByDistance setMiles={setMiles} miles={miles} />
        <EmptyDisplay />
      </>
    );
  }

  return (
    <>
      {/* <FindItemsSlider /> */}
      <FilterByDistance setMiles={setMiles} miles={miles} />
      <div className="row g-2">
        {
      currentItems.map((product) => (
        <div className="col-6 col-sm-4 col-md-2">
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
