import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  collection, query, where, getDocs,
} from '@firebase/firestore';
import { selectAuthState } from '../../../redux/slice/authSlice';
import { db } from '../../../config/firebaseConfig';
import profile from '../../../assets/images/profile.jpg';

export default function UserDetailBox() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const { isLoggedIn, userId } = useSelector(selectAuthState);

  const fetchData = async () => {
    const q = query(collection(db, 'vendors'), where('userId', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setUserData(data);
      console.log('user data', userData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData.displayName) {
    return ('');
  }

  return (
    <div className="user-detail-box">
      <div className="user-detail-box__image-div">
        { !userData.image && <img src={profile} alt="user" /> }
        { userData.image && <img src={userData.image} alt="user" /> }
        <div className="user-detail-box__online-indicator" />
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
      <div className="user-detail-box__report-user-div d-inline-flex">
        <i className="user-detail-box__report-user-icon" />
        <h6 className="user-detail-box__report-user">Report User</h6>
      </div>
    </div>
  );
}
