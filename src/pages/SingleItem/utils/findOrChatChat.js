import {
  addDoc, collection, getDocs, query, where,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const getChatId = async (uid1, uid2, lastMessageData, messageData) => {
  const existingChatQuery = query(
    collection(db, 'chats'),
    where('index', '==', [uid1, uid2].sort().join('-')),
  );

  const existingChatSnapshot = await getDocs(existingChatQuery);

  if (!existingChatSnapshot.empty) {
    const chatId = existingChatSnapshot.docs[0].id;
    return { newChatId: 0, chatId };
  }

  const newChatRef = await addDoc(collection(db, 'chats'), lastMessageData);

  const newChatId = newChatRef.id;

  await addDoc(collection(db, 'chats', newChatId, 'messages'), messageData);

  return { newChatId, chatId: 0 };
};

export default getChatId;
