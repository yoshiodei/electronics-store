import React from 'react';
import { Link } from 'react-router-dom';

export default function VendorDetails() {
  return (
    <div className="vendor-details">
      <div className="vendor-details__info-div d-flex">
        <div className="vendor-details__profile-image-div">
          {/* <img alt="user" /> */}
          <div className="vendor-details__online-indicator" />
        </div>
        <div className="vendor-details__profile-info-div">
          <h6 className="vendor-details__profile-title">Vendor</h6>
          <h5 className="vendor-details__profile-name">John Doe</h5>
        </div>
      </div>
      <Link to="/chat-room" className="vendor-details__button-div ">
        <h5>Start Chat</h5>
      </Link>
    </div>
  );
}
