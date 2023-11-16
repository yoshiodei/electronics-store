import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import { errorToast } from '../../utils/Toasts';
import { db } from '../../config/firebaseConfig';

const checkUsers = async (inputValue) => {
  try {
    const q = query(
      collection(db, 'vendors'),
      where('phoneNumber', '==', inputValue.phoneNumber),
    );

    const querySnapshot = await getDocs(q);
    const allVendors = [];
    querySnapshot.forEach((userDoc) => {
      const queryData = userDoc.data();
      allVendors.push({ ...queryData });
    });

    return allVendors.length;
  } catch (error) {
    errorToast(error.message);
    return 2;
  }
};

export default checkUsers;
