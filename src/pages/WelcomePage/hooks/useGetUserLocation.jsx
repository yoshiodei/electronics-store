import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCoordinates } from '../../../redux/slice/locationSlice';

export default function useGetUserLocation(isLocationAvailable) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLocationAvailable && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setCoordinates({ coordinates: { longitude, latitude }, isLocationAvailable: true }),
        );
      });
    }
    if (!navigator.geolocation) {
      console.log('can not get position');
    }
  }, [isLocationAvailable]);
}
