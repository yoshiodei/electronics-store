import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  doc, deleteDoc, getDocs, collection,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import { fillProductsList } from '../../../redux/slice/productsSlice';

export default function DiscardModal({ show, handleClose, itemName }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDisacard = async () => {
    try {
      await deleteDoc(doc(db, 'products', id));

      const querySnapshot = await getDocs(collection(db, 'products'));
      const allProductsData = [];
      querySnapshot.forEach((item) => {
        const queryData = item.data();
        allProductsData.push({ ...queryData, id: item.id });
      });

      dispatch(fillProductsList(allProductsData));

      toast.success('Item deleted successfully', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      handleClose();
      navigate('/');
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>{`Discard item ${itemName}`}</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div">
            <h4>
              {`Discarding this item, ${itemName}, will completely delete it from your products list.`}
            </h4>
            <h4>
              Do you still want to proceed?
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__discard-button" type="button" onClick={handleDisacard}>
          Yes, Discard Item
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
