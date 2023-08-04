import React from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

export default function ShareModal({ show, handleClose, itemName }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    toast.success('Item URL Copied to Clipbaord', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const shareOnFacebook = () => {
    const itemLink = window.location.href;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemLink)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const itemLink = window.location.href;
    const text = encodeURIComponent(`Check out this ${itemName} at ${itemLink} via ElectroToss`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  const shareOnInstagram = () => {
    window.open('instagram://app', '_blank');
  };

  const shareOnWhatsapp = () => {
    const itemLink = window.location.href;
    const text = encodeURIComponent(`Check out this ${itemName} at ${itemLink} via ElectroToss`);
    const url = `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Share Product on Social Media</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__share-modal__social-link-div">
            <div className="buttons-box__share-modal__social-inner-div">
              <button className="buttons-box__share-modal__whatsapp" type="button" onClick={shareOnWhatsapp}>
                <i className="fa-brands fa-whatsapp" />
              </button>
              <h6>Whatsapp</h6>
            </div>
            <div className="buttons-box__share-modal__social-inner-div">
              <button className="buttons-box__share-modal__facebook" type="button" onClick={shareOnFacebook}>
                <i className="fa-brands fa-facebook-f" />
              </button>
              <h6>Facebook</h6>
            </div>
            <div className="buttons-box__share-modal__social-inner-div">
              <button className="buttons-box__share-modal__twitter" type="button" onClick={shareOnTwitter}>
                <i className="fa-brands fa-twitter" />
              </button>
              <h6>Twitter</h6>
            </div>
            <div className="buttons-box__share-modal__social-inner-div">
              <button className="buttons-box__share-modal__instagram" type="button" onClick={shareOnInstagram}>
                <i className="fa-brands fa-instagram" />
              </button>
              <h6>Instagram</h6>
            </div>
          </div>
          <div className="buttons-box__share-modal__copy-link-div">
            <button
              className="buttons-box__share-modal__copy-link-button"
              type="button"
              onClick={handleCopyLink}
            >
              Click here to copy product link
            </button>
          </div>
          <div className="buttons-box__share-modal__copy-link-div">
            <input className="buttons-box__share-modal__copy-link-input" readOnly value={window.location.href} />
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__close-report-button" type="button" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
