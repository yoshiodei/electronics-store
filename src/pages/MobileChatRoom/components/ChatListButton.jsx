import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import profile from '../../../assets/images/profile.jpg';
import { SET_CHAT_DETAILS } from '../../../redux/slice/chatSlice';
import { db } from '../../../config/firebaseConfig';

export default function ChatListButton({ data, uid }) {
  const { recipientName, recipientImage, recipientId } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetChat = async () => {
    dispatch(SET_CHAT_DETAILS(data));

    try {
      const userRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists) {
        const chatList = docSnap.data()?.chatList;

        // const filteredChatList = chatList.filter(
        //   (chatData) => chatData.recipientId === recipientId,
        // );

        const newChatData = {
          ...data, messageList: [],
        };

        const updatedChatList = chatList.map((chatData) => (
          (chatData.recipientId === recipientId) ? newChatData : chatData
        ));

        await updateDoc(userRef, { chatList: updatedChatList });
      }
      navigate('/chatwall/mobile');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <button
      type="button"
      className="chat-list__card"
      onClick={handleSetChat}
    >
      <div className="chat-list__card-inner-div">
        <div className="chat-list__card-image-div">
          <img src={recipientImage || profile} alt="user profile" className="chat-list__card-image" />
        </div>
        <div className="chat-list__card-info-div">
          <h5>{ recipientName }</h5>
        </div>
      </div>
      { (data?.messageList?.length > 0) && (
      <div className="chat-list__new-message">
        <div className="chat-list__new-message__icon">
          <h6 className="chat-list__new-message__icon-value">New</h6>
        </div>
      </div>
      )}
    </button>
  );
}
