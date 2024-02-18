import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import isItemWithinMiles from '../utils/isItemWithinMiles';
import { subCategoriesObj } from '../../NewItem/components/categoryObj';

export default function useFilterProductData(
  data,
  setFilteredData,
  setCurrentPage,
  isLocationAvailable,
  miles,
  coordinates,
  time,
  setIsLoading,
) {
  console.log('this is from filter Items =>', data);

  const { filterObject } = useSelector(selectProductsState);
  const {
    maxPrice, minPrice, category, condition,
  } = filterObject;

  const checkCategory = (selectedCategory, itemCategoryName) => {
    if (selectedCategory === 'all') {
      return true;
    }
    const isCategoryAvailable = subCategoriesObj[selectedCategory].includes(itemCategoryName);
    return isCategoryAvailable;
  };

  useEffect(() => {
    const filterProductData = async () => {
      try {
        setIsLoading(true);

        let filtered = [];

        if (isLocationAvailable) {
          filtered = data.filter(
            (item) => (
              item.price >= minPrice
              && item.price <= maxPrice
              && (item.condition === condition || condition === 'all')
              && checkCategory(category, item.category)
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
              && (item.category === category || category === 'all')
            ),
          );
        }

        setFilteredData(filtered);
        setCurrentPage(1);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };

    filterProductData();
  }, [data, time, miles]);
}
