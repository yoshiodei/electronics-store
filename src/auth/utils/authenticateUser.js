import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { errorToast, successToast } from '../../utils/Toasts';
import { setUserInfo } from '../../redux/slice/authSlice';

const signUpUser = async (formData, dispatch, countryCode) => {
  try {
    const displayName = `${formData?.firstName} ${formData?.lastName}`;

    const { user } = await window.confirmationResult.confirm(formData?.verificationCode);

    const credential = EmailAuthProvider.credential(`${countryCode}${formData.phoneNumber}@electrotoss.com`, formData.password);

    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        console.log('Account linking success', usercred);
      }).catch((error) => {
        console.log('Account linking error', error);
      });

    await updateProfile(auth.currentUser, {
      displayName: displayName.trim(),
    });

    await setDoc(doc(db, 'vendors', user.uid), {
      firstName: formData?.firstName,
      lastName: formData?.lastName || '',
      displayName,
      bio: 'Hi there, this is my Electrotoss profile.',
      followers: 0,
      email: `${countryCode}${formData.phoneNumber}@electrotoss.com`,
      phoneNumber: '',
      uid: user.uid,
      status: 'active',
      createdAt: new Date(),
      photoURL: '',
      isPremium: false,
      productsPosted: 0,
      productsSold: 0,
      ratings: [],
      emailVerified: true,
      wishlist: [],
      chatList: [],
      messages: [],
      notifications: [],
    });

    const userInfo = {
      emailVerified: true,
      userInfoIsSet: true,
      displayName: displayName.trim(),
      bio: 'Hi there, this is my Electrotoss shop page.',
      email: `${formData.phoneNumber}@electrotoss.com`,
      followers: 0,
      ratings: [],
      phoneNumber: formData.phoneNumber,
      photoURL: '',
    };

    const dataToStore = { isAnonymous: false };
    const dataJSON = JSON.stringify(dataToStore);

    localStorage.setItem('isAnonymous', dataJSON);

    dispatch(setUserInfo(userInfo));

    successToast('Congratulations, your account has been created');

    return true;
  } catch (error) {
    if (error.code === 'auth/invalid-verification-code') {
      errorToast('Incorrect verification code');
    } else {
      errorToast('Sorry, your account could not be created');
    }
    console.log(error.code);
    return false;
  }
};

export default signUpUser;

const fetchUserInfo = async (uid, dispatch) => {
  const docRef = doc(db, 'vendors', uid);
  const docSnapData = await getDoc(docRef);
  const userData = docSnapData.data();

  const userInfo = {
    emailVerified: userData.emailVerified,
    userInfoIsSet: true,
    displayName: userData.displayName,
    bio: userData.bio,
    email: userData.email,
    followers: userData.followers,
    ratings: userData.ratings,
    phoneNumber: userData.phoneNumber,
    photoURL: userData.photoURL,
  };

  dispatch(setUserInfo(userInfo));
};

export const signInUserWithPhoneAndPassword = (
  countryCode,
  phoneNumber,
  password,
  dispatch,
  setFormData,
  setCurrentCountryCode,
  handleCloseSignInModal,
) => {
  const userNumber = `${countryCode}${phoneNumber}@electrotoss.com`;
  signInWithEmailAndPassword(auth, userNumber, password)
    .then((userCredential) => {
      const dataToStore = { isAnonymous: false };
      const dataJSON = JSON.stringify(dataToStore);
      localStorage.setItem('isAnonymous', dataJSON);

      const { uid } = userCredential.user;
      fetchUserInfo(uid, dispatch);

      setFormData({ phoneNumber: '', password: '' });
      setCurrentCountryCode({
        abbreviation: 'US',
        code: '+1',
      });
      handleCloseSignInModal();
      successToast('Sign in successful');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          errorToast('User not found.');
          break;
        case 'auth/wrong-password':
          errorToast('Login failed wrong user credentials');
          break;
        case 'auth/network-request-failed':
          errorToast('You are not connected to the internet.');
          break;
        default:
          errorToast('Sorry something went wrong. Try again');
          break;
      }
    });
};

const provider = new GoogleAuthProvider();

export const handleSignInWithGoogle = async (
  handleCloseSignInModal,
  dispatch,
  setGoogleLoading,
) => {
  try {
    setGoogleLoading(true);
    const result = await signInWithPopup(auth, provider);

    const {
      displayName, photoURL, uid, emailVerified, email: userEmail,
    } = result.user;

    const vendorDocRef = doc(db, 'vendors', uid);
    const docSnap = await getDoc(vendorDocRef);

    const dataToStore = { isAnonymous: false };
    const dataJSON = JSON.stringify(dataToStore);

    localStorage.setItem('isAnonymous', dataJSON);

    if (docSnap.exists()) {
      handleCloseSignInModal();
      fetchUserInfo(uid);
      setGoogleLoading(false);
      successToast('Sign in successful');
    } else {
      // const vendorData = {
      //   displayName,
      //   bio: 'Hi there, this is my Electrotoss shop page.',
      //   followers: 0,
      //   status: 'active',
      //   photoURL: photoURL || '',
      //   isPremium: false,
      //   rating: 1,
      //   uid,
      //   userEmail,
      //   emailVerified,
      //   phoneNumber: '',
      //   createdAt: new Date(),
      //   wishlist: [],
      //   chatList: [],
      //   messages: [],
      //   notifications: [],
      // };

      const vendorData = {
        firstName: displayName?.split(' ')[0],
        lastName: displayName?.split(' ')[1] || '',
        displayName,
        bio: 'Hi there, this is my Electrotoss profile.',
        followers: 0,
        email: userEmail,
        phoneNumber: '',
        uid,
        status: 'active',
        createdAt: new Date(),
        photoURL,
        isPremium: false,
        productsPosted: 0,
        productsSold: 0,
        ratings: [],
        emailVerified: true,
        wishlist: [],
        chatList: [],
        messages: [],
        notifications: [],
      };

      await setDoc(vendorDocRef, vendorData);
      handleCloseSignInModal();

      const userInfo = {
        emailVerified,
        userInfoIsSet: true,
        displayName,
        bio: 'Hi there, this is my Electrotoss shop page.',
        userEmail,
        followers: 0,
        ratings: [],
        phoneNumber: '',
        photoURL: photoURL || '',
      };

      dispatch(setUserInfo(userInfo));

      successToast('Sign in successful');
      setGoogleLoading(false);
    }
  } catch (error) {
    handleCloseSignInModal();
    errorToast('Something went wrong, Please try again');
    setGoogleLoading(false);
  }
};

export const handleResetPassword = async (formData, dispatch) => {
  try {
    const { user } = await window.confirmationResult.confirm(formData?.verificationCode);

    await updatePassword(user, formData.password);

    const dataToStore = { isAnonymous: false };
    const dataJSON = JSON.stringify(dataToStore);
    localStorage.setItem('isAnonymous', dataJSON);

    const { uid } = user;
    fetchUserInfo(uid, dispatch);

    return true;
  } catch (error) {
    if (error.code === 'auth/invalid-verification-code') {
      errorToast('Incorrect verification code');
    } else {
      errorToast('Sorry, your account could not be created');
    }
    console.log(error.code);
    return false;
  }
};
