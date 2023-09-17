import React from 'react';
// import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { SET_RECIPIENT_CHAT_DETAILS } from '../../../redux/slice/chatSlice';
import { selectAuthState } from '../../../redux/slice/authSlice';
// import { db } from '../../../config/firebaseConfig';
import useSetChatList from '../hooks/useSetChatList';

export default function StartChatButton({ recipientData }) {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

  const { setChatList } = useSetChatList();

  // const handleButtonClick = () => {
  //   dispatch(SET_RECIPIENT_CHAT_DETAILS(recipientData));

  //   const vendorRef = doc(db, 'vendors', uid);

  //   updateDoc(vendorRef, {
  //     chatList: arrayUnion({
  //       recipientName: recipientData.vendor.displayName,
  //       recipientId: recipientData.vendorId,
  //       recipientImage: recipientData.vendor.image,
  //     }),
  //   })
  //     .then(() => {
  //       navigate('/chat-room');
  //     })
  //     .catch(
  //       (err) => {
  //         console.log('No such document!', err.message);
  //       },
  //     );
  // };

  const handleStartChat = () => {
    setChatList(uid, recipientData);
  };

  return (
    <button type="button" className="start-chat-button" title="message vendor" onClick={handleStartChat}>
      <i className="fa-regular fa-message" />
    </button>
  );
}
