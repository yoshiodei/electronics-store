import React, { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import ButtonsBoxLoading from './ButtonsBoxLoading';
import { addToWhishList } from '../../../redux/slice/wishListSlice';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ButtonsBox() {
  const initialReport = {
    reportType: 'This is illegal/Fraudulent',
    reportDetail: '',
  };
  const [report, setReport] = useState(initialReport);
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const { id } = useParams();
  const {
    isLoggedIn, docId, displayName, userImage,
  } = useSelector(selectAuthState);

  const fetchData = () => {
    const docRef = doc(db, 'products', id);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          console.log('product in details ==>', data);
          setProduct(data);
        }
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
        },
      );
  };

  const handleAddToWishList = (wishListProduct) => {
    if (!isLoggedIn) {
      console.log('Log in to add items to wish list');
    } else {
      dispatch(addToWhishList({ ...wishListProduct, docId }));
      toast.success('Item added successfully!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleSendReport = async () => {
    if (report.reportDetail.trim().length < 30) {
      toast.error('Report detail is too short!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      try {
        const vendorRef = doc(db, 'vendors', docId);

        const reportData = {
          ...report,
          reportedItemId: id,
          reporterName: displayName,
          reporterId: docId,
          reportedItemName: product?.name,
          reportedItemVendorId: product?.vendorId,
          reportedItemVendorName: product?.vendor.displayName,
          reporterImage: userImage,
          reportDate: Date.now(),
        };

        await updateDoc(vendorRef, {
          productReports: arrayUnion(reportData),
        });

        toast.success('Report sent successfully', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setReport(initialReport);
        handleClose();
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  const handleShare = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!product.name) {
    return (<ButtonsBoxLoading />);
  }

  return (
    <>
      <div className="buttons-box">
        <button type="button" onClick={() => handleAddToWishList(product)}>
          <i className="fa-regular fa-heart" />
          <h6>Save</h6>
        </button>
        <button type="button" onClick={handleShow}>
          <i className="fa-regular fa-flag" />
          <h6>Report</h6>
        </button>
        <button type="button" onClick={handleShare}>
          <i className="fa-solid fa-arrow-up-right-from-square" />
          <h6>Share</h6>
        </button>
      </div>

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
