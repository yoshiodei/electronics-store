import React, { useState } from 'react';
import {
  doc,
  // updateDoc,
  arrayUnion,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ButtonsBoxLoading from './ButtonsBoxLoading';
import { selectWishListState } from '../../../redux/slice/wishListSlice';
import { selectAuthState } from '../../../redux/slice/authSlice';
import ShareModal from './ShareModal';
import { errorToast, successToast } from '../../../utils/Toasts';

export default function ButtonsBox({ product }) {
  const initialReport = {
    reportType: 'This is illegal/Fraudulent',
    reportDetail: '',
  };
  const [report, setReport] = useState(initialReport);
  const [show, setShow] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseShareModal = () => setShowShareModal(false);
  const handleShowShareModal = () => setShowShareModal(true);

  // const dispatch = useDispatch();

  const { id } = useParams();
  const { wishlistIds } = useSelector(selectWishListState);
  const {
    // userInfo,
    loginInfo,
  } = useSelector(selectAuthState);
  // const { displayName, photoURL } = userInfo;
  const { uid } = loginInfo;

  const handleAddProductToWishList = async () => {
    // check if user is the owner of item, if yes send a message
    if (product?.vendor?.uid === uid) {
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

  const handleSendReport = async () => {
    if (report.reportDetail.trim().length < 30) {
      errorToast('Report detail is too short!');
    } else {
      try {
        const reportRef = collection(db, 'reports');

        await addDoc(reportRef, {
          createdAt: new Date(),
          message: report?.reportDetail,
          userId: uid,
          title: report?.reportType,
          type: 'item-report',
          itemId: id,
        });

        // const reportData = {
        //   ...report,
        //   reportedItemId: id,
        //   reporterName: displayName,
        //   reporterId: uid,
        //   reportedItemName: product?.name,
        //   reportedItemVendorId: product?.uid,
        //   reportedItemVendorName: product?.vendor.displayName,
        //   reporterImage: photoURL,
        //   reportDate: new Date(),
        // };

        // await updateDoc(vendorRef, {
        //   productReports: arrayUnion(reportData),
        // });

        successToast('Report sent successfully');

        setReport(initialReport);
        handleClose();
      } catch (err) {
        errorToast(err.message);
      }
    }
  };

  if (!product.name) {
    return (<ButtonsBoxLoading />);
  }

  return (
    <>
      <div className="buttons-box">
        { (uid !== product?.vendor?.uid) && (
        <button type="button" onClick={handleAddProductToWishList}>
          <i className="fa-regular fa-heart" />
          <h6>Save</h6>
        </button>
        )}
        { (uid !== product?.vendor?.uid) && (
        <button type="button" onClick={handleShow}>
          <i className="fa-regular fa-flag" />
          <h6>Report</h6>
        </button>
        )}
        <button type="button" onClick={handleShowShareModal}>
          <i className="fa-solid fa-arrow-up-right-from-square" />
          <h6>Share</h6>
        </button>
      </div>

      <ShareModal
        handleClose={handleCloseShareModal}
        show={showShareModal}
        itemName={product?.name}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>{`Report for ${product?.name}`}</h6>
          </Modal.Title>
        </Modal.Header>
        <div className="buttons-box__modal">
          <Modal.Body>
            <form className="buttons-box__form">
              <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setReport({ ...report, reportType: e.target.value })}>
                <option selected>Report Reason</option>
                <option value="This is illegal/Fraudulent">This is illegal/Fraudulent</option>
                <option value="This ad is spam">This ad is spam</option>
                <option value="This is wrong category">This is wrong category</option>
                <option value="This item is sold">This item is sold</option>
                <option value="User asked prepayment">User asked prepayment</option>
                <option value="User is unreachable">User is unreachable</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="issue" className="mt-3">
                <h6>Please describe your issue</h6>
              </label>
              <textarea id="issue" value={report.reportDetail} onChange={(e) => setReport({ ...report, reportDetail: e.target.value })} />
            </form>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <button className="buttons-box__send-report-button" type="button" onClick={handleSendReport}>
            Send Report
          </button>
          <button className="buttons-box__close-report-button" type="button" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
