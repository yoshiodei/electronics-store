import { useEffect } from 'react';

export default function useSetLocation(locationIsSet, setLocation, setLoadLocation) {
  const fetchLocation = () => {
    if (navigator.geolocation && !locationIsSet) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        setLoadLocation(true);

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

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
            console.log('lala land', {
              country,
              state,
              town,
              latitude,
              longitude,
              locationIsSet: true,
            });
          }
        } catch (error) {
          console.log('Error fetching location:', error);
          setLoadLocation(false);
        } finally {
          setLoadLocation(false);
        }
      });
    } else {
      setLoadLocation(false);
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);
}
