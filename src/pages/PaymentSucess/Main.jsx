import React, {
  useEffect,
} from 'react';
import { doc, setDoc } from '@firebase/firestore';
import { toast } from 'react-toastify';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import { db } from '../../config/firebaseConfig';

export default function Main() {
  const postItem = async () => {
    const promotedItemJSON = localStorage.getItem('promotedItem');

    if (promotedItemJSON) {
      const promotedItem = JSON.parse(promotedItemJSON);

      console.log('this is the promo item -->', promotedItem);

      await setDoc(doc(db, 'products', promotedItem.id), promotedItem);

      toast.success('Item Posted successfully!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      localStorage.removeItem('promotedItem');
      window.location.reload();
    } else {
      console.log('no item found');
    }
  };

  useEffect(async () => {
    postItem();
  }, []);

  const handleNavigate = () => {
    window.location.href = 'https://www.electrotoss.com';
  };

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>
            Payment Successful!!
          </ContentInfoBox>
          <div className="checkout__success-message">
            <h3>Your promoted item will be uploaded once the item in approved after review.</h3>
            <button
              type="button"
              className="checkout__success-button"
              onClick={handleNavigate}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
