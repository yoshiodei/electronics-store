export default function isItemWithinMiles(miles, userCoordinates, product) {
  if (!(product?.location?.locationIsSet)) {
    return false;
  }
  if (!(userCoordinates?.latitude && userCoordinates?.longitude)) {
    return false;
  }

  let distance = 1;

  if (miles > 60) {
    distance = 300;
  } else if (miles > 0 && miles < 70) {
    distance = miles;
  }

  // const distance = miles < 10 ? 1 : miles;

  const R = 6371; // Earth's radius in kilometers

  const lat1 = userCoordinates.latitude;
  const lon1 = userCoordinates.longitude;
  const lat2 = product?.location?.coordinates?.latitude;
  const lon2 = product?.location?.coordinates?.longitude;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
              + Math.cos(lat1 * (Math.PI / 180))
                * Math.cos(lat2 * (Math.PI / 180))
                * Math.sin(dLon / 2)
                * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInMeters = R * c;

  const distanceInMiles = distanceInMeters / 1.60934;

  return (distanceInMiles <= distance);
}
