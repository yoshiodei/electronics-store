import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import isItemWithinMiles from '../utils/isItemWithinMiles';

export default function useFilterProductData(
  data,
  setFilteredData,
  setCurrentPage,
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

  useEffect(() => {
    const filterProductData = async () => {
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
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    filterProductData();
  }, [data, time, miles]);
}
