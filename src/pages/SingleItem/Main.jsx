import React, { useEffect, useState } from 'react';
import {
  arrayUnion, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ItemImageBox from './components/ItemImageBox';
import { db } from '../../config/firebaseConfig';
import ProductDetail from './components/ProductDetails';
import ProductLocation from './components/ProductLocation';
import VendorDetails from './components/VendorDetails';
import ButtonsBox from './components/ButtonsBox';
import { selectAuthState } from '../../redux/slice/authSlice';
import RemoveItemButtonsBox from './components/RemoveItemButtonsBox';
import EditItemButton from './components/EditItemButton';
import ViewsBox from './components/ViewsBox';

export default function Main() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const docRef = doc(db, 'products', id);

  const deviceId = localStorage.getItem('deviceId');
  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  const fetchData = () => {
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

  const addView = async () => {
    if (userIsAnonymous) {
      try {
        await updateDoc(docRef, {
          viewCount: arrayUnion(deviceId),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    if (!userAnonymous) {
      try {
        await updateDoc(docRef, {
          viewCount: arrayUnion(uid),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    addView();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ProductDetail />
          <ProductLocation />
          <ViewsBox uid={uid} />
          <VendorDetails />
          {!userIsAnonymous && <ButtonsBox product={product} />}
          {(!userIsAnonymous && uid === product?.vendorId)
          && <EditItemButton product={product} id={id} />}
          {(!userIsAnonymous && uid === product?.vendorId)
          && <RemoveItemButtonsBox product={product} />}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ItemImageBox />
          <div className="main-section__mobile-div">
            <ProductDetail />
            <ProductLocation />
            <ViewsBox />
            <VendorDetails />
            {!userIsAnonymous && <ButtonsBox product={product} />}
            {(!userIsAnonymous && uid === product?.vendorId)
          && <EditItemButton product={product} id={id} />}
            {(!userIsAnonymous && uid === product?.vendorId)
          && <RemoveItemButtonsBox product={product} />}
          </div>
          {/* <SimilarItems /> */}
        </div>
      </main>
    </div>
  );
}
