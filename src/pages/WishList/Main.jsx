import React, { useEffect, useState } from 'react';
import {
  doc, getDoc, updateDoc,
} from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../config/firebaseConfig';
import ContentInfoBox from '../../components/ContentInfoBox';
import WishListItem from './components/WishListItem';
import AdPanel from '../../components/AdPanel';
import { selectAuthState } from '../../redux/slice/authSlice';
import WishListEmpty from './components/WishListEmpty';
import RemoveAllButton from './components/RemoveAllButton';

export default function Main() {
  const [wishList, setWishList] = useState([]);
  const { docId } = useSelector(selectAuthState);
  let newList = [];

  const fetchData = () => {
    const docRef = doc(db, 'vendors', docId);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          console.log('product in details ==>', data, docId);
          setWishList(data.wishlist);
        }
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
        },
      );
  };

  const removeItem = async (deletedItemId) => {
    newList = wishList.filter((item) => (
      item.id !== deletedItemId
    ));
    try {
      const vendorRef = doc(db, 'vendors', docId);

      await updateDoc(vendorRef, {
        wishlist: newList,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('wish list value ==>', wishList);
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>My Wish List</ContentInfoBox>
          <div className="wish-list__item-div">
            {(wishList.length === 0)
             && <WishListEmpty />}
            { (wishList.length > 0)
              && wishList.map((item) => (
                <WishListItem item={item} removeItem={removeItem} />
              ))}
            {(wishList.length > 1)
             && <RemoveAllButton />}
          </div>
        </div>
      </main>
    </div>
  );
}
