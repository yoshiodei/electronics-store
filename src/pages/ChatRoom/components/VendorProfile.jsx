/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../redux/slice/authSlice';
import profile from '../../../assets/images/profile.jpg';

export default function VendorProfile() {
  const { userImage, displayName } = useSelector(selectAuthState);

  return (
    <div className="vendor-profile d-flex">
      <div className="vendor-profile__image-div">
        { !userImage && <img src={profile} alt="user" /> }
        { userImage && <img src={userImage} alt="user" /> }
        <div className="vendor-profile__online-indicator" />
      </div>
      <div className="vendor-profile__info-div">
        <h5 className="vendor-profile__user-name">
          { displayName }
        </h5>
        <h6 className="vendor-profile__user-last-seen">
          last seen 3:23 pm
        </h6>
      </div>
    </div>
  );
}
