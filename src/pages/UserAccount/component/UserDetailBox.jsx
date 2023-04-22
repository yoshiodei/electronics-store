import React from 'react';

export default function UserDetailBox() {
  return (
    <div className="user-detail-box">
      <div className="user-detail-box__image-div">
        {/* <img alt="user" /> */}
        <div className="user-detail-box__online-indicator" />
      </div>
      <div className="user-detail-box__user-name-div">
        <h5 className="user-detail-box__user-name">
          John Doe
        </h5>
      </div>
      <div className="user-detail-box__user-info-div">
        <h6 className="user-detail-box__user-info-title">
          Followers
        </h6>
        <h6 className="user-detail-box__user-info-value">
          28
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
          4.5
        </h6>
      </div>
      <div className="user-detail-box__user-info-div user-detail-box__user-info-div--bio">
        <h6 className="user-detail-box__user-info-title">
          Bio
        </h6>
        <p className="user-detail-box__user-info-value user-detail-box__user-info-value--bio">
          Lorem ipsum imei dolor kan mahal kal ipsalam
          holoi ini sai uni yulrai. Oni talim salmoni rahim lil ipsum.
        </p>
      </div>
      <div className="user-detail-box__start-chat-div">
        <h5 className="user-detail-box__start-chat">Start Chat</h5>
      </div>
      <div className="user-detail-box__report-user-div d-inline-flex">
        <i className="user-detail-box__report-user-icon" />
        <h6 className="user-detail-box__report-user">Report User</h6>
      </div>
    </div>
  );
}
