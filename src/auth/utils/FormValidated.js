import { errorToast } from '../../utils/Toasts';
import checkIfUserExists from './CheckIfUserExists';

export const signUpFormValidated = async (userData, isPhoneVerified, isChecked) => {
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
  }
  if (await checkIfUserExists(userData?.phoneNumber) >= 2) {
    errorToast('Sorry an error occurred. Please try again.');
    return false;
  }
  if (await checkIfUserExists(userData?.phoneNumber) === 1) {
    errorToast('User with this phone number already exists.');
    return false;
  }
  if (!isPhoneVerified) {
    errorToast('Phone number has not been verified');
    return false;
  }
  if (userData?.verificationCode?.length !== 6) {
    errorToast('Verification code has to be 6 digits');
    return false;
  }
  if (isNaN(userData?.verificationCode)) {
    errorToast('Verification code has to be a number');
    return false;
  }
  if (!isChecked) {
    errorToast('Accept the terms of service to proceed');
    return false;
  }
  return true;
};

export const signInFormValidated = (userData) => {
  if (
    userData?.phoneNumber?.trim().length < 1
  ) {
    errorToast('Phone number field is empty.');
    return false;
  }
  if (
    userData?.password?.trim().length < 1
  ) {
    errorToast('Password field is empty.');
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
  }
  return true;
};

export const passwordResetFormValidated = async (userData, isPhoneVerified) => {
  if (
    userData?.phoneNumber?.trim().length < 1
  ) {
    errorToast('Phone number field is empty.');
    return false;
  }
  if (
    userData?.password?.trim().length < 1
  ) {
    errorToast('Password field is empty.');
    return false;
  }
  if (!isPhoneVerified) {
    errorToast('Phone number has not been verified');
    return false;
  }
  if (userData?.verificationCode?.length !== 6) {
    errorToast('Verification code has to be 6 digits');
    return false;
  }
  if (isNaN(userData?.verificationCode)) {
    errorToast('Verification code has to be a number');
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
  }
  if (await checkIfUserExists(userData?.phoneNumber) >= 2) {
    errorToast('Sorry an error occurred. Please try again.');
    return false;
  }
  if (await checkIfUserExists(userData?.phoneNumber) !== 1) {
    errorToast('User with this phone number does not exist.');
    return false;
  }
  return true;
};
