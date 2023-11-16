import React from 'react';

export default function Main() {
  return (
    <div className="settings">
      <h2 className="settings__title-header">Settings</h2>
      <hr />
      <h6>Account</h6>
      <div className="settings__account-info">
        <div className="settings__account-info-div">
          <p className="settings__account-info-title">Username</p>
        </div>
        <div className="settings__account-info-div">
          <p className="settings__account-info-title">PhoneNumber</p>
        </div>
        <div className="settings__account-info-div">
          <p className="settings__account-info-title">Location</p>
        </div>
        <div className="settings__account-info-div">
          <p className="settings__account-info-title">Rating</p>
        </div>
      </div>
    </div>
  );
}
