import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import {
  auth,
  db,
} from '../../config/firebaseConfig';
import { errorToast } from '../../utils/Toasts';

const handleRegisterUser = async (registerFormData, navigate) => {
  const {
    email, password, firstName, lastName, phoneNumber,
  } = registerFormData;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const initialUserObject = {
      firstName,
      lastName,
      bio: 'Hi there, welcome to my Nudiance profile!',
      createdAt: Date(),
      displayName: lastName ? `${firstName} ${lastName}` : `${firstName}`,
      email,
      emailVerified: false,
      followers: 0,
      isPremium: false,
      notifications: [],
      phoneNumber,
      photoURL: '',
      productsPosted: 0,
      productsSold: 0,
      ratings: [],
      status: 'active',
      uid: user.uid,
    };

    console.log('new user object!', initialUserObject);

    await setDoc(doc(db, 'vendors', user.uid), initialUserObject);

    navigate(`/verify-email/${user.uid}`);

    return null;
  } catch (err) {
    switch (err.code) {
      case 'auth/credential-already-in-use':
        errorToast('Sorry, this credential is already in use');
        break;
      case 'auth/email-already-in-use':
        errorToast('Sorry, this email is already in use');
        break;
      case 'auth/invalid-email':
        errorToast('Email entered is invalid');
        break;
      default:
        errorToast('Something went wrong please try again');
        break;
    }
    return null;
  }

  //   check if user exists
  //   create user
  //   add user to collection
  //   navigate to verify email page
};

export default handleRegisterUser;
