import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import isItemWithinMiles from '../utils/isItemWithinMiles';

export default function useFilterProductData(setFilteredData) {
  const [currentPage, setCurrentPage] = useState(1);
  const { filterObject } = useSelector(selectProductsState);
  const {
    maxPrice, minPrice, category, condition,
  } = filterObject;

  const filterProductData = async (data, miles, coordinates) => {
    try {
      const filtered = data.filter(
        (item) => (
          item.price >= minPrice
          && item.price <= maxPrice
          && (item.condition === condition || condition === 'all')
          && (item.category === category || category === 'all')
          && isItemWithinMiles(miles, coordinates, item)
        ),
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { filterProductData, currentPage, setCurrentPage };
}
