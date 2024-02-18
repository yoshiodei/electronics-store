import { errorToast } from '../../utils/Toasts';

const handleValidateRegisterForm = (formData, isTermsBoxChecked) => {
  const {
    email, password, firstName, phoneNumber,
  } = formData;

  if (email.trim() === '' || password.trim() === '' || firstName.trim() === '') {
    errorToast('Required fields cannot be left empty');
    return false;
  }
  if (password.trim().length < 8) {
    errorToast('Password must at least have 8 characters');
    return false;
  }
  if (!(/^\+?[0-9]*$/.test(phoneNumber))) {
    errorToast('Phone number can have only numbers');
    return false;
  }
  if (!isTermsBoxChecked) {
    errorToast('Agree to terms and conditions to proceed');
    return false;
  }

  return true;
};

export default handleValidateRegisterForm;
