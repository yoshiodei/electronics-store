import React, { useState } from 'react';
import { arrayUnion, doc, setDoc } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import SignUpModal from '../auth/Register/SignUpModal';
import SignInModal from '../auth/SignIn/SignInModal';
import { db } from '../config/firebaseConfig';
import { errorToast, successToast } from '../utils/Toasts';
import { selectWishListState } from '../redux/slice/wishListSlice';

export default function AddToWishListButton({
  userIsAnonymous, vendor, uid, id, name,
}) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const { wishlistIds } = useSelector(selectWishListState);

  const handleAddProductToWishList = async () => {
    // check if user is the owner of item, if yes send a message
    if (vendor?.uid === uid) {
      errorToast('Item you posted cannot be added to whishlist');
      return null;
    }

    console.log('wishlistIds', wishlistIds);

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

  if (!userIsAnonymous) {
    return (
      <button
        title="Add to wishlist"
        type="button"
        className="product-card__add-to-wish-list d-flex"
        onClick={handleAddProductToWishList}
      >
        <i className="fa-sharp fa-regular fa-heart product-card__add-to-wish-list__icon" />
      </button>
    );
  }

  return (
    <>
      <button
        title="Add to wishlist"
        type="button"
        className="product-card__add-to-wish-list d-flex"
        onClick={handleShowSignInModal}
      >
        <i className="fa-sharp fa-regular fa-heart product-card__add-to-wish-list__icon" />
      </button>

      <SignUpModal
        handleShowRegisterModal={handleShowRegisterModal}
        showRegisterModal={showRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
      />

      <SignInModal
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
        handleShowSignInModal={handleShowSignInModal}
        handleShowRegisterModal={handleShowRegisterModal}
      />

    </>
  );
}
