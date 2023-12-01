/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  arrayRemove, doc, getDoc, updateDoc,
} from '@firebase/firestore';
import { useSelector } from 'react-redux';
import ContentInfoBox from '../../components/ContentInfoBox';
import WishListItem from './components/WishListItem';
import AdPanel from '../../components/AdPanel';
import WishListEmpty from './components/WishListEmpty';
import Loader from '../../components/Loader';
import { db } from '../../config/firebaseConfig';
import { selectWishListState } from '../../redux/slice/wishListSlice';
import { errorToast, successToast } from '../../utils/Toasts';

export default function Main({ uid }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { wishlistIds } = useSelector(selectWishListState);

  const removeItem = async (id, name) => {
    const wishlistRef = doc(db, 'wishlists', uid);
    try {
      await updateDoc(wishlistRef, {
        itemIds: arrayRemove(id),
      });
      successToast(`${name} has been removed from wishlist.`);
    } catch (err) {
      console.log(err);
      errorToast('Sorry item could not be removed from wishlist.');
    }
  };

  const fetchWishlists = async () => {
    const wishlistRef = doc(db, 'wishlists', uid);
    const docSnap = await getDoc(wishlistRef);
    setLoading(true);

    if (docSnap.exists()) {
      const productIds = docSnap.data().itemIds;

      const productPromises = productIds.map(async (productId) => {
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
          return { id: productDoc.id, ...productDoc.data() };
        }

        await updateDoc(wishlistRef, {
          itemIds: arrayRemove(productId),
        });
        return null;
      });

      const productsData = await Promise.all(productPromises);

      const validProducts = productsData.filter((product) => product !== null);

      setWishlist(validProducts);
      setLoading(false);
    } else {
      setWishlist([]);
      setLoading(false);
      console.log('No such document!');
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, [wishlistIds?.length]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>My Wish List</ContentInfoBox>
          {loading && (<Loader />)}
          {!loading && (
          <div className="wish-list__item-div">
              {(wishlist.length === 0)
             && <WishListEmpty />}
              { (wishlist.length > 0)
              && wishlist.map((item) => (
                <WishListItem
                  item={item}
                  removeItem={removeItem}
                />
              ))}
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
