import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { handleSwitchRegister } from '../../utils/SwitchModals';
import TermsOfService from '../../../pages/TermsAndConditions/components/TermsOfService';

export default function TermsAndConditionsModal(
  { handleCloseTerms, showTerms, handleShowRegisterModal },
) {
  return (
    <Modal
      show={showTerms}
      onHide={handleCloseTerms}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Terms and Conditions</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="modal__custom-content__terms-body">
            <TermsOfService />
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__close-report-button" type="button" onClick={() => handleSwitchRegister(handleCloseTerms, handleShowRegisterModal)}>
          Back to form
        </button>
      </Modal.Footer>
    </Modal>
  );
}
