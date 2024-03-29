import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsState, setCoordinate } from '../redux/slice/productsSlice';

export default function useGetUserLocation() {
  const dispatch = useDispatch();
  const { userCoordinates } = useSelector(selectProductsState);
  const { longitude: userLongitude } = userCoordinates;

  const getUserLocation = () => {
    if (navigator.geolocation && userLongitude === 0) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        console.log('coords', { latitude, longitude });

        dispatch(setCoordinate({ latitude, longitude }));
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
}
