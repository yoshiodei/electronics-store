/* eslint-disable no-await-in-loop */
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import { addDoc, collection } from '@firebase/firestore';
import { db, storage } from '../../../config/firebaseConfig';
import { errorToast } from '../../../utils/Toasts';
import { stripePaymentLink } from '../../../Constants/constantVariables';

const validateNewItemForm = (newItem) => {
  const {
    name, price, details, images,
  } = newItem;

  if (!name.trim() || !price.trim() || !details.trim()) {
    errorToast('Found empty text fields');
    return false;
  }

  if (isNaN(price.trim())) {
    errorToast('Price must be a number');
    return false;
  }

  if (images.length === 0) {
    errorToast('No item image selected');
    return false;
  }

  return true;
};

const handleRedirectToCheckout = async (
  newItem,
  setIsCheckingOut,
  brandAndCategoriesObject,
  userCoordinate,
  userData,
) => {
  const {
    name, price, details, images, condition,
  } = newItem;

  const { displayName, photoURL, uid } = userData;

  const {
    selectedCategory, selectedBrand, selectedSubCategory, otherBrand,
  } = brandAndCategoriesObject;

  if (validateNewItemForm(newItem)) {
    setIsCheckingOut(true);

    try {
      const storageRef = sRef(storage, 'product_images');
      const imageUrls = [];

      for (let i = 0; i < newItem.images.length; i += 1) {
        const image = images[i];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      let itemBrand;
      if (selectedBrand === 'other') {
        itemBrand = otherBrand;
      } else {
        itemBrand = selectedBrand;
      }

      const vendorData = {
        displayName,
        photoURL,
        uid,
      };

      const promotedItem = {
        name,
        price,
        brand: itemBrand,
        details,
        status: 'pending',
        category: selectedCategory,
        subCategory: selectedSubCategory,
        condition,
        lastEdited: new Date(),
        location: {
          locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
          locationName: `${location.town}, ${location.state}`,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: userCoordinate?.longitude || location.longitude,
            latitude: userCoordinate?.latitude || location.latitude,
          },
        },
        images: imageUrls,
        viewCount: [],
        isPromoted: true,
        postedFrom: 'web',
        datePosted: new Date(),
        dateLastPromoted: new Date(),
        vendor: vendorData,
      };

      const transactionObject = {
        createdAt: new Date(),
        purpose: 'promote item',
        userId: uid,
        status: 'pending',
        promotedItem,
      };

      await addDoc(collection(db, 'transactions'), transactionObject);

      window.location.href = stripePaymentLink;
      // window.location.href = 'https://buy.stripe.com/test_cN22cd7OSf0j4fu5kk';

      setIsCheckingOut(false);
    } catch (error) {
      setIsCheckingOut(false);
      console.log('cannot submit form', error.message);
      errorToast('Error submitting form. Please try again.');
    }
  }
};

export default handleRedirectToCheckout;
