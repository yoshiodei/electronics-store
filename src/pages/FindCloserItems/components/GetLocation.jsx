import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function GetLocation() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch({ coordinates: { longitude, latitude }, isLocationAvailable: true });
      });
    } else {
      setErrorMessage('Unable to find your location');
    }
  };

  return (
    <div className="tabs-custom__empty-div">
      {/* <i className="fa-solid fa-face-sad-tear" /> */}
      <h2>Get your location and start searching for items near you</h2>
      <button
        type="button"
        className="tabs-custom__reload"
        onClick={handleGetLocation}
      >
        Get Your Location
      </button>
      <h6 className="tabs-custom__error-message">{errorMessage}</h6>
    </div>
  );
}
