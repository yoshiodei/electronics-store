import React from 'react';

export default function VendorProfile() {
  return (
    <div className="vendor-profile d-flex">
      <div className="vendor-profile__image-div">
        {/* <img alt="user" /> */}
        <div className="vendor-profile__online-indicator" />
      </div>
      <div className="vendor-profile__info-div">
        <h5 className="vendor-profile__user-name">
          John Doe
        </h5>
        <h6 className="vendor-profile__user-last-seen">
          last seen 3:23 pm
        </h6>
      </div>
    </div>
  );
}
