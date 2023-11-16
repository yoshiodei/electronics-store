import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const sendMessage = async (uid1, uid2) => {
  const existingChatQuery = query(
    collection(db, 'chats'),
    where('index', '==', [uid1, uid2].sort().join('-')),
  );

  const existingChatSnapshot = await getDocs(existingChatQuery);

  if (!existingChatSnapshot.empty) {
    const chatId = existingChatSnapshot.docs[0].id;
    return chatId;
  }
  return false;
};

export default sendMessage;
