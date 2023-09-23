import { useEffect } from 'react';

function generateDeviceId() {
  return `device-${Math.random().toString(36).substring(2, 10)}`;
}

export default function useAssignDeviceId() {
  useEffect(() => {
    const storedDeviceId = localStorage.getItem('deviceId');

    if (storedDeviceId) {
      console.log('deviceId is set');
    } else {
      const newDeviceId = generateDeviceId();
      localStorage.setItem('deviceId', newDeviceId);
    }
  }, []);
}
