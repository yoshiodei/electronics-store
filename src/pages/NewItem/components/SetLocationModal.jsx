import React from 'react';
import { Modal } from 'react-bootstrap';

export default function SetLocationModal({ showLocationModal, handleCloseLocationModal }) {
  const handleSetLocation = () => {};
  const handleNoLocationPost = () => {};

  return (
    <Modal
      show={showLocationModal}
      size="lg"
      onHide={handleCloseLocationModal}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Location not set</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div">
            <h4>
              Your item location has not been been set. Would you still like to post your item?
            </h4>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__discard-button" type="button" onClick={handleNoLocationPost}>
          Yes, Proceed
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={handleSetLocation}>
          Set Item Location
        </button>
      </Modal.Footer>
    </Modal>
  );
}
