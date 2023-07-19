import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection } from '@firebase/firestore';
import { toast } from 'react-toastify';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import { selectProductsState, setPromotedItem } from '../../redux/slice/productsSlice';
import { db } from '../../config/firebaseConfig';

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { promotedItem } = useSelector(selectProductsState);

  useEffect(() => {
    const postItem = async () => {
      try {
        await addDoc(collection(db, 'pendingItems'), promotedItem);
        dispatch(setPromotedItem({}));

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
      } catch (error) {
        toast.error('Error posting item. Please try again.', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };

    postItem();
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>
            Payment Successful
          </ContentInfoBox>
          <div className="checkout__success-message">
            <h3>Your promoted item will be uploaded once the item in approved after review.</h3>
            <button
              type="button"
              className="checkout__success-button"
              onClick={() => navigate('/')}
            >
              Go Back Home

            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
