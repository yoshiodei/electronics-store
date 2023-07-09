import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import NotificationsEmpty from './components/NotificationsEmpty';
import { db } from '../../config/firebaseConfig';
import { selectAuthState } from '../../redux/slice/authSlice';
import MessagesList from './components/MessagesList';

export default function Main() {
  const { docId } = useSelector(selectAuthState);
  const [notificationsList, setNotificationsList] = useState([]);

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'vendors', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const vendorData = docSnap.data();
        console.log('notifications!!', vendorData.notifications);
        setNotificationsList(vendorData.notifications);
      } else {
        console.log('No such document!');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
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
          {(notificationsList.length > 0) && <MessagesList data={notificationsList} />}
          {(notificationsList.length === 0) && <NotificationsEmpty />}
        </div>
      </main>
    </div>
  );
}
