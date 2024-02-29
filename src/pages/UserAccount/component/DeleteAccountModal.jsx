import {
  collection,
  deleteDoc, doc, where,
  query,
  getDocs,
} from '@firebase/firestore';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../../config/firebaseConfig';
import { removeProduct, selectProductsState } from '../../../redux/slice/productsSlice';
import { errorToast, successToast } from '../../../utils/Toasts';

// const successToast = () => {
//   toast.success('Account Deleted Successfully', {
//     position: 'top-center',
//     autoClose: 2500,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: 'light',
//   });
// };

// const errorToast = (error) => {
//   toast.error(error, {
//     position: 'top-center',
//     autoClose: 2500,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: 'light',
//   });
// };

export default function DeleteAccountModal({
  showDeleteAccount, handleCloseDeleteAccount,
}) {
  const { productsList } = useSelector(selectProductsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      password,
    );

    try {
      setLoading(true);
      const { uid } = user;

      console.log('cred', credential);
      await reauthenticateWithCredential(user, credential);

      const q = query(
        collection(db, 'products'),
        where('vendorId', '==', uid),
      );

      const querySnapshot = await getDocs(q);

      let editableProductList = productsList;

      querySnapshot.forEach(async (d) => {
        editableProductList = editableProductList.filter((item) => (d.id !== item.id));
        dispatch(removeProduct(editableProductList));

        await deleteDoc(doc(db, 'products', d.id));
      });

      await deleteDoc(doc(db, 'vendors', uid));

      await deleteUser(user);

      handleCloseDeleteAccount();
      navigate('/');
      successToast('Account deleted successfully!');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-mismatch':
          errorToast('Credential does not correspond to user.');
          break;
        case 'auth/wrong-password':
          errorToast('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          errorToast('Email provided is not valid.');
          break;
        default:
          errorToast('An error occurred. Account not deleted.');
          break;
      }
    } finally {
      setLoading(false);
      setPassword('');
    }
  };

  const handleDeleteGoogleAccount = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;
        console.log(token);
        // await reauthenticateWithCredential(user, credential);
        async function delUser() {
          await deleteUser(user);
        }

        delUser();

        navigate('/');
        successToast('Account deleted successfully!');
      }).catch((err) => {
        errorToast(err.code);
      });
  };

  return (
    <Modal show={showDeleteAccount} onHide={handleCloseDeleteAccount} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Delete My Account</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div">
            <h5 className="user-detail-box__delete-account-modal__heading-text">
              Enter your password to permanently delete your account and clear all of its posts.
            </h5>
            <input
              className="user-detail-box__delete-account-modal__input"
              placeholder="Please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="user-detail-box__delete-account-modal__input-or">-- or --</p>
            <button
              className="user-detail-box__delete-account-modal__google-delete"
              type="button"
              onClick={handleDeleteGoogleAccount}
            >
              Delete Account created with Google Sign In
            </button>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button
          className={password
            ? 'user-detail-box__buttons-box__discard-button'
            : 'user-detail-box__buttons-box__discard-button button-disabled'}
          type="button"
          onClick={handleDeleteAccount}
          disabled={!(password)}
        >
          {loading ? '...loading' : 'Yes, Delete Account'}
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleCloseDeleteAccount}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
