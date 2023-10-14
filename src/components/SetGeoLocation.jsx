import React, { useState } from 'react';

export default function SetGeoLocation() {
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [timeoutMessage, setTimeoutMessage] = useState(null);

  const searchLocation = () => {
    setLoading(true);
    setLocationData(null);

    const timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
      setTimeoutMessage('Location search timed out. Please try again.');
    }, 30000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timer);
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
            );

            if (response.ok) {
              const data = await response.json();

              const locationDetails = {
                town: data.results[0].address_components.find(
                  (component) => component.types.includes('locality'),
                )?.long_name || '',
                state: data.results[0].address_components.find(
                  (component) => component.types.includes('administrative_area_level_1'),
                )?.long_name || '',
                country: data.results[0].address_components.find(
                  (component) => component.types.includes('country'),
                )?.long_name || '',
              };

              setLocationData(locationDetails);
            }
          } catch (error) {
            console.error('Error fetching location data:', error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting user coordinates:', error);
          clearTimeout(timer);
          setLoading(false);
        },
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      clearTimeout(timer);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="col-md-3">
        <div className="new-item-form__input-div">
          <label htmlFor="state" className="new-item-form__label">Get Item Location</label>
          <button
            className="new-item-form__search-location-button"
            type="button"
            onClick={searchLocation}
          >
            Search Location
          </button>
        </div>
      </div>
      {loading && <p>Searching location...</p>}
      {timeoutMessage && <p>{timeoutMessage}</p>}
      { locationData && (
      <div>
        <div className="col-md-3">
          <div className="new-item-form__input-div">
            <label htmlFor="country" className="new-item-form__label">Country</label>
            <input
              id="country"
              className="new-item-form__input"
              placeholder="State"
              name="state"
              readOnly
              value={location.country}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="new-item-form__input-div">
            <label htmlFor="state" className="new-item-form__label">State</label>
            <input
              id="state"
              className="new-item-form__input"
              placeholder="State"
              name="state"
              readOnly
              value={location.state}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="new-item-form__input-div">
            <label htmlFor="city" className="new-item-form__label">City / Town</label>
            <input
              id="city"
              className="new-item-form__input"
              placeholder="City / Town"
              name="city"
              value={location.town}
              readOnly
            />
          </div>
        </div>
      </div>
      )}
    </>
  );
}
