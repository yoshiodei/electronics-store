import React, { useEffect, useState } from 'react';
import {
  arrayUnion, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import { db } from '../../config/firebaseConfig';
import ProductDetail from './components/ProductDetails';
import ProductLocation from './components/ProductLocation';
import { selectAuthState } from '../../redux/slice/authSlice';
import VendorDetails from './components/VendorDetails';
import ButtonsBox from './components/ButtonsBox';
import RemoveItemButtonsBox from './components/RemoveItemButtonsBox';
import EditItemButton from './components/EditItemButton';
import ViewsBox from './components/ViewsBox';
import ItemImageBox from './components/ItemImageBox';
import DisplaySimilarItems from './components/DisplaySimilarItems';
import DisplayUserItems from './components/DisplayUserItems';

export default function Main() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid, isAnonymous } = loginInfo;

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
          <VendorDetails id={product?.vendor?.uid} />
          {!userIsAnonymous && <ButtonsBox product={product} />}
          {(!userIsAnonymous && (uid === product?.vendor?.uid))
          && <EditItemButton product={product} id={id} />}
          {(!userIsAnonymous && uid === product?.vendor?.uid)
          && <RemoveItemButtonsBox product={product} />}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ItemImageBox />
          <div className="main-section__mobile-div">
            <ViewsBox uid={uid} />
            <ProductDetail />
            <ProductLocation />
            <VendorDetails id={product?.vendor?.uid} />
            {!userIsAnonymous && <ButtonsBox product={product} />}
            {(!userIsAnonymous && (uid === product?.vendor?.uid))
          && <EditItemButton product={product} id={id} />}
            {(!userIsAnonymous && (uid === product?.vendor?.uid))
          && <RemoveItemButtonsBox product={product} />}
          </div>
          <DisplayUserItems
            displayName={product?.vendor?.displayName}
            vendorId={product?.vendor?.uid}
          />
          <DisplaySimilarItems
            category={product?.category}
            id={id}
          />
        </div>
      </main>
    </div>
  );
}
