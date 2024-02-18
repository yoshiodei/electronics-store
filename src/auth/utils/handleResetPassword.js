import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { errorToast, successToast } from '../../utils/Toasts';

const handleResetPassword = (email, setEmail, navigate) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      successToast('Password reset email sent');
      setEmail('');
      navigate('/sign-in');
    })
    .catch((err) => {
      switch (err.code) {
        case 'auth/user-not-found':
          errorToast('User not found');
          break;
        case 'auth/missing-email':
          errorToast('Please provide an email to proceed');
          break;
        default:
          errorToast(err.code);
          break;
      }
    });
};

export default handleResetPassword;
