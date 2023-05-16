import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profile from '../../../assets/images/profile.jpg';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function UserDetailBox() {
  const {
    displayName, userImage, followers, bio, rating,
  } = useSelector(selectAuthState);

  return (
    <div className="user-detail-box">
      <div className="user-detail-box__image-div">
        { !userImage && <img src={profile} alt="user" /> }
        { userImage && <img src={userImage} alt="user" /> }
        <div className="user-detail-box__online-indicator" />
      </div>
      <div className="user-detail-box__user-name-div">
        <h5 className="user-detail-box__user-name">
          {displayName}
        </h5>
      </div>
      <div className="user-detail-box__user-info-outer-div">
        <div className="user-detail-box__user-info-div">
          <h6 className="user-detail-box__user-info-title">
            Followers
          </h6>
          <h6 className="user-detail-box__user-info-value">
            {followers}
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
            {rating}
          </h6>
        </div>
      </div>
      <div className="user-detail-box__user-info-div user-detail-box__user-info-div--bio">
        <h6 className="user-detail-box__user-info-title">
          Bio
        </h6>
        <p className="user-detail-box__user-info-value user-detail-box__user-info-value--bio">
          {bio}
        </p>
      </div>
      <Link to="/chat-room" className="user-detail-box__start-chat-div">
        <h5 className="user-detail-box__start-chat">Start Chat</h5>
      </Link>
      <div className="user-detail-box__report-user-div d-inline-flex">
        <i className="user-detail-box__report-user-icon" />
        <h6 className="user-detail-box__report-user">Report User</h6>
      </div>
    </div>
  );
}
