import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import NotificationsEmpty from './components/NotificationsEmpty';
import { db } from '../../config/firebaseConfig';
import MessagesList from './components/MessagesList';
import Loader from '../../components/Loader';

export default function Main({ uid }) {
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const docRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const vendorData = docSnap.data();
        console.log('notifications!!', vendorData.notifications);
        setNotificationsList(vendorData.notifications);
        setLoading(false);
      } else {
        console.log('No such document!');
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const resetNewNotifications = async () => {
    try {
      const vendorRef = doc(db, 'vendors', uid);

      await updateDoc(vendorRef, {
        newNotifications: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    resetNewNotifications();
    console.log('data after fetch', notificationsList);
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Notifications</ContentInfoBox>
          {loading && (<Loader />)}
          {!loading && (
          <>
            {(notificationsList.length > 0) && <MessagesList data={notificationsList} />}
            {(notificationsList.length === 0) && <NotificationsEmpty />}
          </>
          )}
        </div>
      </main>
    </div>
  );
}
