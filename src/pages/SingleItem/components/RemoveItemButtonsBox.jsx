import React, { useState } from 'react';
import SoldModal from './SoldModal';
import DiscardModal from './DiscardModal';

export default function RemoveItemButtonsBox({ product }) {
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleCloseSoldModal = () => setShowSoldModal(false);
  const handleShowSoldModal = () => setShowSoldModal(true);

  const handleCloseDiscardModal = () => setShowDiscardModal(false);
  const handleShowDiscardModal = () => setShowDiscardModal(true);

  return (
    <>
      <div className="buttons-box">
        <button type="button" onClick={handleShowSoldModal} className="buttons-box__sold">
          <i className="fa-regular fa-circle-check" />
          <h6>Mark as Sold</h6>
        </button>
        <button type="button" onClick={handleShowDiscardModal} className="buttons-box__delete">
          <i className="fa-solid fa-trash" />
          <h6>Delete Item</h6>
        </button>
      </div>

      <SoldModal
        handleClose={handleCloseSoldModal}
        show={showSoldModal}
        itemName={product?.name}
        product={product}
      />

      <DiscardModal
        handleClose={handleCloseDiscardModal}
        show={showDiscardModal}
        itemName={product?.name}
      />
    </>
  );
}
