import {
  collection,
  deleteDoc, doc, where,
  query,
  getDocs,
} from '@firebase/firestore';
import { deleteUser, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../config/firebaseConfig';

const successToast = () => {
  toast.success('Account Deleted Successfully', {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

const errorToast = () => {
  toast.error('Sorry could not delete account', {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default function DeleteAccountModal({
  showDeleteAccount, handleCloseDeleteAccount,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        setLoading(true);
        const { uid } = user;

        await deleteDoc(doc(db, 'vendors', uid));

        const q = query(
          collection(db, 'products'),
          where('vendorId', '==', uid),
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (d) => {
          await deleteDoc(doc(db, 'products', d.id));
        });

        await deleteUser(user);

        navigate('/');

        successToast();
      } catch (err) {
        console.log(err.message);
        errorToast();
      } finally {
        setLoading(false);
        handleCloseDeleteAccount();
      }
    }
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
            <h4>
              Do you want to permanently delete your account and clear all of its posts?
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__discard-button" type="button" onClick={handleDeleteAccount}>
          {loading ? '...deleting' : 'Yes, Delete Account'}
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleCloseDeleteAccount}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
