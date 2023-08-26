import React from 'react';

export default function GetLocation() {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
      });
    }
  };

  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>Get your location and start searching for items near you</h2>
      <button
        type="button"
        className="tabs-custom__reload"
        onClick={handleGetLocation}
      >
        Get Your Location
      </button>
    </div>
  );
}
