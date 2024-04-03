import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { errorToast, successToast } from '../../utils/Toasts';
import { auth, db } from '../../config/firebaseConfig';

const createNewUser = async (user) => {
  const {
    email, phoneNumber, photoURL, uid,
  } = user;

  const displayName = user?.displayName;
  const firstName = displayName?.split(' ')[0];
  const lastName = displayName?.split(' ')[1] || '';

  const newUserObject = {
    firstName,
    lastName,
    bio: 'Hi there, welcome to my Nudiance profile!',
    createdAt: Date(),
    displayName,
    email,
    emailVerified: true,
    followers: 0,
    isPremium: false,
    notifications: [],
    phoneNumber,
    photoURL,
    productsPosted: 0,
    productsSold: 0,
    ratings: [],
    status: 'active',
    uid,
  };

  await setDoc(doc(db, 'vendors', uid), newUserObject);
};

const fetchUser = async (user, navigate) => {
  const docRef = doc(db, 'vendors', user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    successToast('Sign in successful');
    navigate('/');
  } else {
    createNewUser(user);
    successToast('Sign in successful');
    navigate('/');
  }
};

const handleGoogleSignIn = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log('google sign in successful', credential);
      // const token = credential.accessToken;
      const { user } = result;
      fetchUser(user, navigate);
    }).catch((err) => {
      switch (err.code) {
        case 'auth/invalid-email':
          errorToast('Email entered is invalid');
          break;
        default:
          errorToast('Something went wrong please try again');
          break;
      }
    });
};

export default handleGoogleSignIn;
