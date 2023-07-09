import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ItemImageBox from './components/ItemImageBox';
import { db } from '../../config/firebaseConfig';
import ProductDetail from './components/ProductDetails';
import ProductLocation from './components/ProductLocation';
// import SimilarItems from './components/SimilarItems';
import VendorDetails from './components/VendorDetails';
import ButtonsBox from './components/ButtonsBox';
import { selectAuthState } from '../../redux/slice/authSlice';

export default function Main() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { isLoggedIn } = useSelector(selectAuthState);

  const fetchData = () => {
    const docRef = doc(db, 'products', id);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          console.log('product ==>', data);
          setProduct(data);
        }
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
        },
      );
  };

  useEffect(() => {
    fetchData();
    console.log('this is the product data', product);
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ProductDetail />
          <ProductLocation />
          <VendorDetails />
          {isLoggedIn && <ButtonsBox product={product} />}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ItemImageBox />
          <div className="main-section__mobile-div">
            <ProductDetail />
            <ProductLocation />
            <VendorDetails />
            {isLoggedIn && <ButtonsBox product={product} />}
          </div>
          {/* <SimilarItems /> */}
        </div>
      </main>
    </div>
  );
}
