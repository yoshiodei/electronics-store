import { doc, updateDoc, arrayUnion } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function useSetViews() {
  const { id } = useParams();
  const [userId, setUserId] = useState('');
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

  const deviceId = localStorage.getItem('deviceId');
  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const { isAnonymous } = JSON.parse(isAnonymousJSON);

  const updateProductViews = async () => {
    const productRef = doc(db, 'products', id);

    if (isAnonymous) {
      setUserId(deviceId);
    } else if (!isAnonymous && uid) {
      setUserId(uid);
    }

    try {
      if (setUserId) {
        await updateDoc(productRef, {
          viewCount: arrayUnion(userId),
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    updateProductViews();
  }, []);
}
