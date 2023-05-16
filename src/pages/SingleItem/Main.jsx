import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import ItemImageBox from './components/ItemImageBox';
import { db } from '../../config/firebaseConfig';
import ProductDetail from './components/ProductDetails';
import ProductLocation from './components/ProductLocation';
// import SimilarItems from './components/SimilarItems';
import VendorDetails from './components/VendorDetails';
import ButtonsBox from './components/ButtonsBox';

export default function Main() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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
    console.log('this is the product dataa', product);
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ProductDetail />
          <ProductLocation />
          <VendorDetails />
          <ButtonsBox />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ItemImageBox />
          <div className="main-section__mobile-div">
            <ProductDetail />
            <ProductLocation />
            <VendorDetails />
            <ButtonsBox />
          </div>
          {/* <SimilarItems /> */}
        </div>
      </main>
    </div>
  );
}
