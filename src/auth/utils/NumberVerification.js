import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { errorToast, successToast } from '../../utils/Toasts';

const generateRecapture = () => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // onSignInSubmit();
    },
  }, auth);
};

export const handleSendVerificationCode = async (
  code,
  phoneNumber,
  setIsPhoneVerified,
  setIsLoading,
) => {
  setIsLoading(true);

  generateRecapture();
  const appVerifier = window.recaptchaVerifier;
  const number = `${code}${phoneNumber}`;

  signInWithPhoneNumber(auth, number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setIsPhoneVerified(true);
      setIsLoading(false);
      successToast('Verification code has been sent to your phone');
    }).catch((error) => {
      setIsLoading(false);
      // console.log('the error code is', error);
      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorToast('Phone number provided is not valid.');
          break;
        case 'auth/network-request-failed':
          errorToast('Network error: Please check your internet connection.');
          break;
        default:
          errorToast('Sorry number could not be verified');
          break;
      }
    });
};

// export const handleVerifyCode = async () => {
//   if (OTP.length === 6) {
//     try {
//       setIsLoading(true);

//       const displayName = `${inputValue.firstName} ${inputValue.lastName}`;

//       const { user } = await window.confirmationResult.confirm(OTP);

//       const credential = EmailAuthProvider.credential(
//         `${inputValue
//           .phoneNumber}@electrotoss.com`,
//         inputValue.password,
//       );

//       linkWithCredential(auth.currentUser, credential)
//         .then((usercred) => {
//           console.log('Account linking success', usercred);
//         }).catch((error) => {
//           console.log('Account linking error', error);
//         });

//       await updateProfile(auth.currentUser, {
//         displayName: displayName.trim(),
//       });

//       await setDoc(doc(db, 'vendors', user.uid), {
//         displayName: displayName.trim(),
//         email: `${inputValue.phoneNumber}@electrotoss.com`,
//         emailVerified: user.emailVerified,
//         bio: 'Hi there, this is my Electrotoss shop page.',
//         followers: 0,
//         photoURL: '',
//         isPremium: false,
//         rating: 1,
//         uid: user.uid,
//         status: 'active',
//         createdAt: Date.now(),
//         phoneNumber: inputValue?.phoneNumber,
//         wishlist: [],
//         chatList: [],
//         messages: [],
//         notifications: [],
//       });

//       const userInfo = {
//         emailVerified: true,
//         userInfoIsSet: true,
//         displayName: displayName.trim(),
//         bio: 'Hi there, this is my Electrotoss shop page.',
//         email: `${inputValue.phoneNumber}@electrotoss.com`,
//         followers: 0,
//         rating: 1,
//         phoneNumber: inputValue.phoneNumber,
//         photoURL: '',
//       };

//       const dataToStore = { isAnonymous: false };
//       const dataJSON = JSON.stringify(dataToStore);

//       localStorage.setItem('isAnonymous', dataJSON);

//       dispatch(setUserInfo(userInfo));

//       setIsLoading(false);
//       handleCloseRegisterModal();
//       setExpandForm(false);
//       setInputValue(initialValue);
//       setOTP('');
//       successToast('Congratulations, your account has been created');
//     } catch (error) {
//       setIsLoading(false);
//       setOTP('');
//       setExpandForm(false);
//       errorToast('Sorry, your account could not be created');
//       console.log(error.code);
//     }
//   }
// };

export const yale = () => {};
