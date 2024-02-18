import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import VerifyEmailBox from './components/VerifyEmailBox';
import { db } from '../../config/firebaseConfig';
import { errorToast } from '../../utils/Toasts';
import UserNotFoundBox from './components/UserNotFoundBox';
import VerifyEmailLoading from './components/VerifyEmailLoading';

export default function Main() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function checkUserValidity() {
      setLoading(true);
      const docRef = doc(db, 'vendors', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setLoading(false);
      } else {
        errorToast('user was not found');
        setLoading(false);
      }
    }

    checkUserValidity();
  }, [id]);

  if (loading) {
    return (
      <VerifyEmailLoading />
    );
  }

  if (!loading && !userData?.email) {
    return (
      <UserNotFoundBox />
    );
  }

  return (
    <VerifyEmailBox userData={userData} navigate={navigate} />
  );
}
