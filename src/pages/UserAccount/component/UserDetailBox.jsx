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

export default function UserDetailBox() {
  const initialReport = {
    reportType: 'User is a Fraud',
    reportDetail: '',
  };
  const [report, setReport] = useState(initialReport);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const {
    isLoggedIn, userId, displayName, docId, userImage,
  } = useSelector(selectAuthState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const q = query(collection(db, 'vendors'), where('userId', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc2) => {
      const data = doc2.data();
      setUserData(data);
      console.log('user data', userData);
    });
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
          reportedVendorId: id,
          reporterName: displayName,
          reporterId: docId,
          reportedVendorName: userData.displayName,
          reporterImage: userImage,
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
          <img src={userImage || profile} alt="user" />
          {/* <div className="user-detail-box__online-indicator" /> */}
        </div>
        <div className="user-detail-box__user-name-div">
          <h5 className="user-detail-box__user-name">
            {userData.displayName}
          </h5>
        </div>
        <div className="user-detail-box__user-info-outer-div">
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Followers
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.followers}
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Total Posts
            </h6>
            <h6 className="user-detail-box__user-info-value">
              11
            </h6>
          </div>
          <div className="user-detail-box__user-info-div">
            <h6 className="user-detail-box__user-info-title">
              Rating
            </h6>
            <h6 className="user-detail-box__user-info-value">
              {userData.rating}
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
        { isLoggedIn && (id !== userId)
      && (
      <Link to="/chat-room" className="user-detail-box__start-chat-div">
        <h5 className="user-detail-box__start-chat">Start Chat</h5>
      </Link>
      )}
        {(id === docId) && (
        <button className="user-detail-box__edit-user-button d-flex" type="button" onClick={() => { navigate('/edit-profile'); }}>
          <i className="user-detail-box__report-user-icon fa-solid fa-pen-to-square" />
          <h6 className="user-detail-box__report-user">Edit</h6>
        </button>
        )}
        {(id !== docId) && (
        <button className="user-detail-box__report-user-button d-inline-flex" type="button" onClick={handleShow}>
          <i className="user-detail-box__report-user-icon fa-solid fa-flag" />
          <h6 className="user-detail-box__report-user">Report User</h6>
        </button>
        )}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>{`Report user ${userData?.displayName}`}</h6>
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
