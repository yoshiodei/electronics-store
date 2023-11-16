/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
import {
  collection, doc, getDoc, onSnapshot, query,
  where,
  orderBy,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const fetchUserDetails = async (id) => {
  const docRef = doc(db, 'vendors', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log('Document data:', docSnap.data());
    return data;
  }
  return null;
};

const fetchChats = (uid, setChatsArray) => {
  const q = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', uid),
    // orderBy('lastMessage.createdAt', 'desc'),
  );

  const unsubscribe = onSnapshot(
    q,
    async (querySnapshot) => {
      const chatsArray = [];

      for (const itemDoc of querySnapshot.docs) {
        const chatData = itemDoc.data();

        const otherUserId = chatData.participants[0] === uid
          ? chatData.participants[1]
          : chatData.participants[0];

        const otherUserDetails = await fetchUserDetails(otherUserId);

        if (otherUserDetails) {
          chatData.otherUserDetails = otherUserDetails;
        }

        chatsArray.push(
          {
            ...chatData,
            chatRoomId: itemDoc.id,
          },
        );
      }
      setChatsArray(chatsArray);
    },
  );

  return unsubscribe;
};

export default fetchChats;

export const fetchMessages = (chatRoomId, setMessages) => {
  console.log('chat room id', chatRoomId);
  const unsubscribe = onSnapshot(
    query(
      collection(db, 'chats', chatRoomId, 'messages'),
      orderBy('createdAt'),
    ),
    (querySnapshot) => {
      const chatMessages = querySnapshot.docs.map((messageDoc) => {
        const message = messageDoc.data();
        console.log('message docs', message);
        return {
          _id: messageDoc.id,
          message: message.message,
          createdAt: message.createdAt.toDate(),
          senderId: message.senderId,
          image: message.image || null,
        };
      });
      console.log('chatMessages', chatMessages);
      setMessages(chatMessages);
    },
    (err) => {
      console.log('Error fetching chat messages', err);
    },
  );
  return unsubscribe;
};
