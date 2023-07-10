import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import {
  useDispatch,
//   useSelector,
} from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ProductCard from '../../../components/ProductCard';
// import DisplayProductLoader from './DisplayProductLoader';
import {
  fillProductsList,
//   selectProductsState,
} from '../../../redux/slice/productsSlice';

export default function DisplayProducts() {
  // const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState();

  const [products, setProducts] = useState([]);
  //   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  //   const [isError, setIsError] = useState(false);

  //   const {
  //     // productsList,
  //     // filterObject,
  //   } = useSelector(selectProductsState);
  //   const {
  //     maxPrice, minPrice, condition, category, location, updateTime,
  //   } = filterObject;
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
    //   setIsLoadingProducts(true);
      const q = query(collection(db, 'products'), where('isPromoted', '==', true));
      const querySnapshot = await getDocs(q);
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });

      const q2 = query(collection(db, 'products'), where('isPromoted', '==', false));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ ...data, id: doc.id });
      });
      console.log('all', allProducts);
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    //   setIsLoadingProducts(false);
    } catch (err) {
    //   setIsLoadingProducts(false);
    //   setIsError(true);
      console.log(err.message);
    }
  };

  useEffect(() => {
    // if (productsList.length === 0) {
    //   fetchData();
    // } else {
    //   console.log('is loaded', productsList);
    //   setProducts(productsList);
    // }
    console.log('edey job');
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter(() => (
    //   item.price >= minPrice
    //     && item.price <= maxPrice
    //     && (item.condition === condition || condition === 'all')
    //     && (item.location === location || location === 'all')
    //     && (item.category === category || category === 'all')
      true
    ));

    setFilteredProducts(filtered);
    dispatch(fillProductsList(filtered));
    setCurrentPage(1);
  }, [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //   if (isLoadingProducts) {
  //     return (<DisplayProductLoader />);
  //   }

  //   if (!isLoadingProducts && isError) {
  //     return (<div>Loading error, please reload.</div>);
  //   }

  //   if (!isLoadingProducts && currentItems.length === 0 && !isError) {
  //     return (<div>Items are empty!</div>);
  //   }

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
      <div className="pagination-div d-flex">
        <div className="pagination d-flex">
          <button
            className="pagination__button-prev"
            type="button"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <h6>Prev</h6>
          </button>
          <div className="pagination__buttons-div d-flex">
            {
               Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) })
                 .map((_, index) => (
                   <li className="page-item">
                     <button
                       type="button"
                       className="pagination__button"
                       onClick={() => paginate(index + 1)}
                     >
                       {index + 1}
                     </button>

                   </li>
                 ))
            }
          </div>
          <button
            className="pagination__button-prev"
            type="button"
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
            onClick={() => paginate(currentPage + 1)}
          >
            <h6>Next</h6>
          </button>
        </div>
      </div>
    </>
  );
}
