import {
  addDoc,
  collection,
  doc, setDoc,
} from '@firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import { SET_CHAT_TEMPLATE, SET_RECIPIENT_CHAT_DETAILS } from '../../../redux/slice/chatSlice';
import getChatId from '../utils/findOrChatChat';

export default function useNewChat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startChat = async (messageObject) => {
    const {
      image, displayName, senderId, message, recipientId, itemName, itemId,
    } = messageObject;
    console.log('messageObject', messageObject);

    const lastMessageData = {
      index: [senderId, recipientId].sort().join('-'),
      participants: [senderId, recipientId],
      lastMessage: {
        createdAt: new Date(),
        image,
        message,
        senderId,
      },
    };

    const messageData = itemId ? ({
      createdAt: new Date(),
      displayName,
      message,
      senderId,
      itemId,
      itemName,
    }) : ({
      createdAt: new Date(),
      displayName,
      message,
      senderId,
    });

    try {
      const {
        newChatId,
        chatId,
      } = await getChatId(senderId, recipientId, lastMessageData, messageData);

      if (newChatId === 0) {
        const recipientData = {
          vendorId: recipientId,
          image,
          displayName,
          chatRoomId: chatId,
        };

        const templateObject = {
          message,
          senderId,
          recipientId,
          senderImage: image,
          roomId: chatId,
          timeStamp: new Date(),
          linkId: chatId,
          chatItem: itemName,
        };

        await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
        await setDoc(doc(db, 'chats', chatId), lastMessageData);

        dispatch(SET_RECIPIENT_CHAT_DETAILS(recipientData));
        dispatch(SET_CHAT_TEMPLATE(templateObject));
      }

      if (chatId === 0) {
        const recipientData2 = {
          vendorId: recipientId,
          image,
          displayName,
          chatRoomId: newChatId,
        };

        const templateObject2 = {
          message,
          senderId,
          recipientId,
          senderImage: image,
          roomId: newChatId,
          timeStamp: new Date(),
          linkId: itemId,
          chatItem: itemName,
        };

        dispatch(SET_RECIPIENT_CHAT_DETAILS(recipientData2));
        dispatch(SET_CHAT_TEMPLATE(templateObject2));
      }

      navigate('/messages');
    } catch (err) {
      console.log(err);
    }
  };

  return startChat;
}
