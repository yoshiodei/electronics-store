export default function useGetItemsNearMe() {
  const itemsNearMe = (product, userCoordinates, miles) => {
    if (!(product?.location?.locationIsSet)) {
      return false;
    }

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
    const distance = R * c;

    const distanceInMiles = distance / 1.60934;

    return (distanceInMiles <= miles);
  };

  return itemsNearMe;
}
