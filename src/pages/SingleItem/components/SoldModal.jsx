import {
  collection, deleteDoc, doc, getDocs, setDoc,
} from '@firebase/firestore';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../../../config/firebaseConfig';
import { fillProductsList } from '../../../redux/slice/productsSlice';

export default function SoldModal({
  show, handleClose, itemName, product,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleItemSold = async () => {
    try {
      await deleteDoc(doc(db, 'products', id));
      await setDoc(doc(db, 'soldProducts', id), { ...product, status: 'sold' });

      const querySnapshot = await getDocs(collection(db, 'products'));
      const allProductsData = [];
      querySnapshot.forEach((item) => {
        const queryData = item.data();
        allProductsData.push({ ...queryData, id: item.id });
      });

      dispatch(fillProductsList(allProductsData));

      toast.success('Sold item successfully', {
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
          <h6>{`Mark item ${itemName} as sold`}</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div">
            <h4>
              {`Do you want to mark your item, ${itemName}, as Sold?`}
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__sold-button" type="button" onClick={handleItemSold}>
          Yes, Mark as Sold
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
