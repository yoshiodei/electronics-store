import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';

export default function DeleteRequestModal({ show, setShow, id }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteRequest = async () => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, 'BuyerRequest', id));
      setShow(false);
      setIsLoading(false);
      successToast('Your request was deleted successfully.');
      navigate('/request-item-list');
    } catch (err) {
      console.log(err.message);
      errorToast('Sorry, your request could not be deleted.');
      setIsLoading(false);
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Delete Request</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__modal-title-div-alt">
            <h4>
              Would you like to delete this request?
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__discard-button" type="button" onClick={handleDeleteRequest}>
          {isLoading ? '...deleting' : 'Delete Request'}
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={() => setShow(false)}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
