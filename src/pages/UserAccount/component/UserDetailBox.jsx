import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

export default function UserDetailBox({ userProductIds }) {
  const initialReport = {
    reportType: 'User is a Fraud',
    reportDetail: '',
  };
  const [report, setReport] = useState(initialReport);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const [userData, setUserData] = useState({});
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

  const fetchData = async () => {
    const q = query(
      collection(db, 'vendors'),
      where('uid', '==', id),
    );
    const querySnapshot = await getDocs(q);
    let allData = {};
    querySnapshot.forEach((doc2) => {
      const data = doc2.data();
      allData = data;
      console.log('user data', userData);
    });

    const q2 = query(
      collection(db, 'products'),
      where('vendorId', '==', id),
      where('status', '==', 'active'),
    );
    const querySnapshot2 = await getDocs(q2);
    const numberOfProducts = querySnapshot2.docs.length;
    setUserData({ ...allData, numberOfProducts });

    const q3 = query(
      collection(db, 'soldProducts'),
      where('vendorId', '==', id),
    );
    const querySnapshot3 = await getDocs(q3);
    const numberOfSoldProducts = querySnapshot3.docs.length;
    setUserData({ ...allData, numberOfProducts, numberOfSoldProducts });
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
          reportDate: Date.now(),
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
            {userData.displayName}
          </h5>
        </div>
        <div className="user-detail-box__user-info-outer-div">
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Active Posts
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.numberOfProducts}
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Sold Items
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.numberOfSoldProducts}
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Rating
            </h6>
            <h6 className="user-detail-box__user-info-value">
              <div className="user-detail-box__user-rating-div">
                {/* <i className="fa-regular fa-star-half-stroke" /> */}
                <i className="fa-solid fa-star active" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
              </div>
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
      <Link to="/chat-room" className="user-detail-box__start-chat-div">
        <h5 className="user-detail-box__start-chat">Start Chat</h5>
      </Link>
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
        {(id !== uid) && (
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>{`Report user ${displayName}`}</h6>
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
