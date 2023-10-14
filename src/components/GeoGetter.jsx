import React, { useState } from 'react';

function GeoGetter({ location, setLocation }) {
  const [isSearching, setIsSearching] = useState(false);

  const fetchLocation = () => {
    setIsSearching(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          );
          const data = await response.json();
          const { results } = data;
          if (results && results.length > 0) {
            const addressComponents = results[0].address_components;
            let country = '';
            let state = '';
            let town = '';
            addressComponents.forEach((component) => {
              if (component.types.includes('country')) {
                country = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
              if (component.types.includes('locality')) {
                town = component.long_name;
              }
            });
            setLocation({
              country,
              state,
              town,
              latitude,
              longitude,
              locationIsSet: true,
            });
            setIsSearching(false);
          }
        } catch (error) {
          setIsSearching(false);
          console.log('Error fetching location:', error);
        }
      });
    } else {
      setIsSearching(false);
      console.log('Geolocation is not supported by this browser.');
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
            onClick={fetchLocation}
          >
            {isSearching ? '...Searching' : 'Search Location'}
          </button>
        </div>
      </div>
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
    </>
  );
}

export default GeoGetter;
