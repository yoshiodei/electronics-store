import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import { errorToast } from '../../../utils/Toasts';
import Loader from '../../../components/Loader';
import { selectAuthState } from '../../../redux/slice/authSlice';
import profile from '../../../assets/images/profile.jpg';
import DeleteRequestModal from './DeleteRequestModal';
import useNewChat from '../../SingleItem/hooks/useNewChat';

export default function SingleItemCard() {
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { photoURL } = userInfo;

  const newChat = useNewChat();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [request, setRequest] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const fetchRequest = async () => {
    setIsLoading(true);
    const docRef = doc(db, 'BuyerRequest', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const requestData = docSnap.data();
      setRequest(requestData);
      setIsLoading(false);
    } else {
      errorToast('Sorry, request does not exist');
      setRequest({});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  if (isLoading) {
    return (<Loader />);
  }

  if (!isLoading && !request.name) {
    return (<div>Item does not exist</div>);
  }

  const textTemplate = `Hi ${request?.vendor?.displayName || 'there'}.`;

  const messageObject = {
    senderId: uid,
    image: photoURL || '',
    displayName: request?.vendor?.displayName || '',
    message: textTemplate,
    recipientId: id,
  };

  const handleStartChat = async () => {
    const docRef = doc(db, 'vendors', id);
    setIsLoadingChat(true);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await newChat(messageObject);
      setIsLoadingChat(false);
    } else {
      errorToast();
      setIsLoadingChat(false);
      console.log('No such document!');
    }
  };

  return (
    <>
      <div className="request__single-item-info-div">
        {request.itemType === 'vehicles' ? (
          <div className="request__single-item-item-type">
            <i className="fa-solid fa-car-side" />
            <h5>Vehicle</h5>
          </div>
        ) : null}
        {request.itemType === 'electronics' ? (
          <div className="request__single-item-item-type">
            <i className="fa-solid fa-mobile-retro" />
            <h5>Electronics</h5>
          </div>
        ) : null}
        <div className="request__single-item-inner-info-div">
          <div className="request__single-item__inner-info-div-top">
            <h3>{request.name}</h3>
            {
          request?.priceRange?.upperLimit > 0
            ? (<h5>{`Between $${request.priceRange.lowerLimit} and $${request.priceRange.upperLimit}`}</h5>)
            : null
          }
            <p>{request.details}</p>
            <div className="request__single-item__vendor-info-div">
              <div className="request__single-item__vendor-image-div">
                <img src={request?.vendor?.photoURL || profile} alt="profile" />
              </div>
              <button
                type="button"
                onClick={() => navigate(`/user-account/${request.vendor.uid}`)}
              >
                {request.vendor.displayName}
              </button>
            </div>
          </div>
          <div className="request__single-item__inner-info-div-bottom">
            {
                request.vendor.uid !== uid
                  ? (
                    <button
                      type="button"
                      onClick={handleStartChat}
                      className="request__single-item__inner-info-div-bottom__button"
                    >
                      {!isLoadingChat ? 'Start Chat' : '...loading'}
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => setShow(true)}
                      className="request__single-item__inner-info-div-bottom__button delete-button"
                    >
                      Delete
                    </button>
                  )
                 }
          </div>
        </div>
      </div>
      <DeleteRequestModal show={show} setShow={setShow} id={id} />
    </>
  );
}
