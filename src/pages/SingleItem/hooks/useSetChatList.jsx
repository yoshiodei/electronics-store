import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import { SET_CHAT_TEMPLATE, SET_RECIPIENT_CHAT_DETAILS } from '../../../redux/slice/chatSlice';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function useSetChatList() {
  const navigate = useNavigate();
  const {
    userInfo,
  } = useSelector(selectAuthState);
  const { photoURL } = userInfo;
  const { id } = useParams();
  const dispatch = useDispatch();

  async function setChatList(uid, recipientData) {
    const { vendor, vendorId } = recipientData;

    const chatListObj = {
      recipientName: vendor.displayName,
      recipientId: vendorId,
      recipientImage: vendor.image,
    };

    const textTemplate = `Hi ${recipientData.vendor.displayName}, I'm interested in the ${recipientData.name} you have for sale and I would love to chat with you about it.`;

    try {
      const senderRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(senderRef);

      if (docSnap.exists) {
        const chatList = docSnap.data().chatList || [];

        const filteredChatList = chatList.filter(
          (chatData) => chatData.recipientId !== chatListObj.recipientId,
        );

        const newChatList = [chatListObj, ...filteredChatList];
        const combinedId = (uid > vendorId) ? `${uid}${vendorId}` : `${vendorId}${uid}`;

        const messageObject = {
          message: textTemplate,
          senderId: uid,
          recipientId: vendorId,
          senderImage: photoURL,
          roomId: combinedId,
          timeStamp: Date.now(),
          linkId: id,
          chatItem: recipientData.name,
        };

        updateDoc(senderRef, { chatList: newChatList })
          .then(() => {
            dispatch(SET_RECIPIENT_CHAT_DETAILS(recipientData));
            dispatch(SET_CHAT_TEMPLATE(messageObject));
            navigate('/chat-room');
          })
          .catch(
            (err) => {
              console.log('No such document!', err.message);
            },
          );
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  return { setChatList };
}
