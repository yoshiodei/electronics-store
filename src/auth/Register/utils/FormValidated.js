import { toast } from 'react-toastify';
import checkIfUserExists from './CheckIfUserExists';

const errorToast = (err) => {
  toast.error(err.message, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

const FormValidated = async (userData) => {
  if (
    userData?.firstName?.trim().length < 1
          || userData?.phoneNumber?.trim().length < 1
          || userData?.password?.trim().length < 1
  ) {
    errorToast('Required fields cannot be left empty.');
    return false;
  }
  if (isNaN(userData?.phoneNumber)) {
    errorToast('Phone number field takes only numbers.');
    return false;
  }
  if (userData?.phoneNumber?.trim().length < 10) {
    errorToast('Phone number field should have at least 10 digits.');
    return false;
  }
  if (userData?.password?.trim().length < 8) {
    errorToast('Password should have at least 8 characters.');
    return false;
  } if (await checkIfUserExists(userData?.phoneNumber) >= 2) {
    errorToast('Sorry an error occurred. Please try again.');
    return false;
  } if (await checkIfUserExists(userData?.phoneNumber) === 1) {
    errorToast('User with this phone number already exists.');
    return false;
  }
  return true;
};

export default FormValidated;
