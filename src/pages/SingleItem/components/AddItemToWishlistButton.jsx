import React from 'react';
import { useSelector } from 'react-redux';
import { arrayUnion, doc, setDoc } from '@firebase/firestore';
import { errorToast, successToast } from '../../../utils/Toasts';
import { db } from '../../../config/firebaseConfig';
import { selectWishListState } from '../../../redux/slice/wishListSlice';

export default function AddItemToWishlistButton(
  { vendor, uid, id },
) {
  const { wishlistIds } = useSelector(selectWishListState);

  const handleAddProductToWishList = async () => {
    // check if user is the owner of item, if yes send a message
    if (vendor?.uid === uid) {
      errorToast('Item you posted cannot be added to whishlist');
      return null;
    }

    const itemExists = wishlistIds.some((itemId) => (itemId === id));

    if (itemExists) {
      errorToast(`${name} item has already been added`);
      return null;
    }

    const wishlistRef = doc(db, 'wishlists', uid);
    try {
      await setDoc(
        wishlistRef,
        { itemIds: arrayUnion(id), userId: uid },
        { merge: true },
      );
    } catch (error) {
      errorToast('Sorry, something went wrong. Try again');
      console.log(error);
      return null;
    }

    successToast(`${name} has been added to wishlist`);
    return null;
  };

  return (
    <button
      type="button"
      title="Add to wishlist"
      className="carousel__custom__add-to-wishlist-button"
      onClick={handleAddProductToWishList}
    >
      <i className="fa-sharp fa-regular fa-heart" />
    </button>
  );
}
