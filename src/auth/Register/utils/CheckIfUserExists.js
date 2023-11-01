import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';

const checkIfUserExists = async (userPhoneNumber) => {
  try {
    const q = query(
      collection(db, 'vendors'),
      where('phoneNumber', '==', userPhoneNumber),
    );

    const querySnapshot = await getDocs(q);
    const allVendors = [];
    querySnapshot.forEach((userDoc) => {
      const queryData = userDoc.data();
      allVendors.push({ ...queryData });
    });

    return allVendors.length;
  } catch (error) {
    return 2;
  }
};

export default checkIfUserExists;
