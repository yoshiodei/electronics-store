import React from 'react';

function Test() {
  const coordinates2 = { latitude: 6.666600, longitude: -1.616271 };
  const coordinates1 = { latitude: 5.614818, longitude: -0.205874 };

  const getDistance = () => {
    const R = 6371; // Earth's radius in kilometers

    const lat1 = coordinates1.latitude;
    const lon1 = coordinates1.longitude;
    const lat2 = coordinates2.latitude;
    const lon2 = coordinates2.longitude;

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(lat1 * (Math.PI / 180))
              * Math.cos(lat2 * (Math.PI / 180))
              * Math.sin(dLon / 2)
              * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const distanceInMiles = distance / 1.60934;

    return distanceInMiles;
  };

  return (
    <div>
      the distance is
      {' '}
      {getDistance()}
      {' '}
      miles.
    </div>
  );
}

export default Test;
