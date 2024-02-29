import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  collection, query, where, getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from '@firebase/firestore';
import { selectAuthState } from '../../../redux/slice/authSlice';
import { db } from '../../../config/firebaseConfig';
import profile from '../../../assets/images/profile.jpg';
import DeleteAccountModal from './DeleteAccountModal';
import useDisplayStars from '../hooks/useDisplayStars';
import ReviewModal from './ReviewModal';
import calculateNewRating from '../utils/calculateNewRating';
import useNewChat from '../../SingleItem/hooks/useNewChat';

export default function UserDetailBox({ userProductIds }) {
  const initialReport = {
    reportType: 'User is a Fraud',
    reportDetail: '',
  };
  const [report, setReport] = useState(initialReport);

  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({});

  const [show, setShow] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const navigate = useNavigate();

  const rating = calculateNewRating(userData.ratings);
  const renderStars = useDisplayStars(rating);

  const newChat = useNewChat();

  const { id } = useParams();
  const {
    loginInfo, userInfo,
  } = useSelector(selectAuthState);

  const { displayName, photoURL } = userInfo;
  const { isAnonymous, uid } = loginInfo;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDeleteAccount = () => setShowDeleteAccount(false);
  const handleShowDeleteAccount = () => setShowDeleteAccount(true);

  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleShowReviewModal = () => setShowReviewModal(true);

  const fetchData = async () => {
    const q = query(collection(db, 'vendors'), where('uid', '==', id));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc1) => {
        console.log(doc1.id, ' => ', doc1.data());
        const itemData = doc1.data();
        setUserData(itemData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const textTemplate = `Hi ${userData?.firstName || 'there'}.`;

  const messageObject = {
    senderId: uid,
    image: photoURL || '',
    displayName: userData?.firstName || '',
    message: textTemplate,
    recipientId: id,
  };

  const handleStartChat = async () => {
    setIsLoading(true);
    await newChat(messageObject);
    setIsLoading(false);
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
        const vendorRef = doc(db, 'vendors', id);

        const reportData = {
          ...report,
          reportedVendorId: id,
          reporterName: displayName,
          reporterId: uid,
          reportedVendorName: userData.displayName,
          reporterImage: photoURL,
          reportDate: new Date(),
        };

        await updateDoc(vendorRef, {
          userReports: arrayUnion(reportData),
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

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData.displayName) {
    return ('');
  }

  return (
    <>
      <div className="user-detail-box">
        <div className="user-detail-box__image-div">
          <img src={userData.photoURL || profile} alt="user" />
        </div>
        <div className="user-detail-box__user-name-div">
          <h5 className="user-detail-box__user-name">
            {userData?.firstName}
          </h5>
        </div>
        <div className="user-detail-box__user-info-outer-div">
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Active Posts
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.productsPosted}
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Sold Items
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.productsSold}
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Rating
            </h6>
            <h6 className="user-detail-box__user-info-value">
              { renderStars }
            </h6>
          </div>
        </div>
        <div className="user-detail-box__user-info-div user-detail-box__user-info-div--bio">
          <h6 className="user-detail-box__user-info-title">
            Bio
          </h6>
          <p className="user-detail-box__user-info-value user-detail-box__user-info-value--bio">
            {userData.bio}
          </p>
        </div>
        { !isAnonymous && (id !== uid)
      && (
      <button
        type="button"
        className="user-detail-box__start-chat-div"
        onClick={handleStartChat}
      >
        <h5 className="user-detail-box__start-chat">{isLoading ? '...Loading Chat' : 'Start Chat'}</h5>
      </button>
      )}
        {(id === uid) && (
        <button className="user-detail-box__edit-user-button d-flex" type="button" onClick={() => { navigate('/edit-profile'); }}>
          <i className="user-detail-box__report-user-icon fa-solid fa-pen-to-square" />
          <h6 className="user-detail-box__report-user">Edit</h6>
        </button>
        )}
        {(id === uid) && (
        <button className="user-detail-box__delete-user-button d-flex" type="button" onClick={handleShowDeleteAccount}>
          <h6 className="user-detail-box__report-user">Delete Account</h6>
        </button>
        )}
        {!isAnonymous && (id !== uid) && (
        <button className="user-detail-box__rate-user-button" type="button" onClick={handleShowReviewModal}>
          <i className="user-detail-box__report-user-icon fa-solid fa-pen-nib" />
          <h6 className="user-detail-box__report-user">Write Review</h6>
        </button>
        )}
        { !isAnonymous && (id !== uid) && (
        <button className="user-detail-box__report-user-button d-inline-flex" type="button" onClick={handleShow}>
          <i className="user-detail-box__report-user-icon fa-solid fa-flag" />
          <h6 className="user-detail-box__report-user">Report User</h6>
        </button>
        )}
      </div>

      <DeleteAccountModal
        handleCloseDeleteAccount={handleCloseDeleteAccount}
        showDeleteAccount={showDeleteAccount}
        uid={id}
        userProductIds={userProductIds}
      />

      <ReviewModal
        handleCloseReviewModal={handleCloseReviewModal}
        showReviewModal={showReviewModal}
        displayName={userData?.displayName?.split(' ')[0]}
        ratings={userData.ratings}
      />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>{`Report user ${userData?.firstName}`}</h6>
          </Modal.Title>
        </Modal.Header>
        <div className="buttons-box__modal">
          <Modal.Body>
            <form className="buttons-box__form">
              <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setReport({ ...report, reportType: e.target.value })}>
                <option selected>Report Reason</option>
                <option value="User is a Fraud">User is a Fraud</option>
                <option value="User information does not match">User information does not match</option>
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
