/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import {
  doc, increment, setDoc, updateDoc,
} from '@firebase/firestore';
import { vehiclesArray } from './vehicleCategoryObj';
import { errorToast, successToast } from '../../../utils/Toasts';
import GeoGetter from '../../../components/GeoGetter';
import { db, storage } from '../../../config/firebaseConfig';
import { addNewProduct, selectProductsState } from '../../../redux/slice/productsSlice';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function CarsFormItems() {
  const dispatch = useDispatch();

  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const {
    displayName, photoURL, isPremium, productsPosted,
  } = userInfo;

  const initialLocation = {
    country: '',
    state: '',
    town: '',
    longitude: '',
    latitude: '',
    locationIsSet: false,
  };

  const initialState = {
    name: '',
    price: '',
    details: '',
    brand: '',
    vin: '',
    year: '',
    status: 'pending',
    viewCount: [],
    images: [],
    category: '',
    mainCategory: '',
    datePosted: new Date(),
    lastEdited: new Date(),
    condition: 'new',
    postedFrom: 'web',
    itemType: 'vehicles',
    isPromoted: false,
    vendor: {},
    location: {
      locationIsSet: false,
      country: '',
      state: '',
      town: '',
      coordinates: {
        longitude: '',
        latitude: '',
      },
    },
  };

  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [vehicleCategory, setVehicleCategory] = useState('Cars & Trucks');
  const [vehicleMake, setVehicleMake] = useState(Object.keys(vehiclesArray[vehicleCategory])[0]);
  const [vehicleModel, setVehicleModel] = useState(vehiclesArray[vehicleCategory][vehicleMake][0]);
  const [vehicleData, setVehicleData] = useState(initialState);

  const handleChangeCategory = (e) => {
    const { value } = e.target;
    setVehicleCategory(value);
    setVehicleMake(Object.keys(vehiclesArray[value])[0]);
    const make = Object.keys(vehiclesArray[value])[0];
    setVehicleModel(vehiclesArray[value][make][0]);
  };

  const handleChangeVehicleMake = (e) => {
    const { value } = e.target;
    setVehicleMake(value);
    setVehicleModel(vehiclesArray[vehicleCategory][value][0]);
  };

  const handleChangeVehicleModel = (e) => {
    const { value } = e.target;
    setVehicleModel(value);
  };

  const handleVehicleDataChange = (e) => {
    const { value, name } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleChangeImage = (e, index) => {
    const file = e.target.files[0];

    if (file && file.size <= 5242880) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...vehicleData.images];
        updatedImages[index] = {
          file,
          preview: reader.result,
        };
        setVehicleData((prevState) => ({
          ...prevState,
          images: updatedImages,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      errorToast('Selected image size is more than 5MB.');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...vehicleData.images];
    updatedImages.splice(index, 1);
    setVehicleData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const [location, setLocation] = useState(initialLocation);
  const { userCoordinate } = useSelector(selectProductsState);

  const redirectToCheckout = async () => {
    if (!isPremium && productsPosted >= 3) {
      errorToast('You have reached the total monthly posts');

      setIsCheckingOut(false);
      return;
    }

    setIsCheckingOut(true);

    const {
      name, price, details, images, condition,
    } = vehicleData;

    if (!name.trim() || !price.trim() || !details.trim()) {
      errorToast('Found empty text fields');

      setIsCheckingOut(false);
      return;
    }

    if (isNaN(price.trim())) {
      errorToast('Price must be a number');

      setIsPosting(false);
      return;
    }

    if (images.length === 0) {
      errorToast('No item image selected');

      setIsPosting(false);
    } else {
      setIsPosting(false);

      try {
        const storageRef = sRef(storage, 'product_images');
        const imageUrls = [];

        for (let i = 0; i < vehicleData.images.length; i += 1) {
          const image = images[i];
          const fileRef = sRef(storageRef, image.file.name);
          await uploadBytes(fileRef, image.file);
          const downloadUrl = await getDownloadURL(fileRef);
          imageUrls.push(downloadUrl);
        }

        // let itemBrand;
        // if (selectedBrand === 'other') {
        //   itemBrand = otherBrand;
        // } else {
        //   itemBrand = selectedBrand;
        // }

        const vendorData = {
          displayName,
          photoURL,
          uid,
        };

        const promotedItem = {
          name,
          price,
          // brand: itemBrand,
          // details,
          // status: 'pending',
          // category: selectedCategory,
          // subCategory: selectedSubCategory,
          condition,
          // lastEdited: new Date(),
          // location: {
          //   locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
          //   locationName: `${location.town}, ${location.state}`,
          //   country: location.country,
          //   state: location.state,
          //   town: location.town,
          //   coordinates: {
          //     longitude: userCoordinate?.longitude || location.longitude,
          //     latitude: userCoordinate?.latitude || location.latitude,
          //   },
          // },
          images: imageUrls,
          viewCount: [],
          isPromoted: true,
          postedFrom: 'web',
          itemType: 'electronics',
          datePosted: new Date(),
          dateLastPromoted: new Date(),
          vendor: vendorData,
        };

        const promotedItemJSON = JSON.stringify(promotedItem);
        localStorage.setItem('promotedItem', promotedItemJSON);

        // console.log(promotedItem);
        // window.location.href = stripePaymentLink;
        // window.location.href = 'https://buy.stripe.com/test_cN22cd7OSf0j4fu5kk';
      } catch (error) {
        setIsPosting(false);
        console.log('cannot submit form', error.message);
        errorToast('Error submitting form. Please try again.');
      }
    }
  };

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();

    if (!isPremium && productsPosted >= 3) {
      errorToast('You have reached maximum posts for this month');
      setIsCheckingOut(false);
      return;
    }

    const {
      price, details, images, condition, year, vin,
    } = vehicleData;

    setIsPosting(true);

    if (!price.trim() || !details.trim() || !year.trim() || !vin.trim()) {
      errorToast('Found empty text fields');
      setIsPosting(false);
      return;
    }

    if (isNaN(year.trim()) || year.length !== 4) {
      errorToast('Please enter a valid year');
      setIsPosting(false);
      return;
    }

    if (isNaN(price.trim())) {
      errorToast('Price must be a number');
      setIsPosting(false);
      return;
    }

    if (images.length === 0) {
      errorToast('No item image selected');
      setIsPosting(false);
    }

    try {
      const storageRef = sRef(storage, 'product_images');
      const imageUrls = [];

      for (let i = 0; i < images.length; i += 1) {
        const image = images[i];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      const vendorData = {
        displayName,
        image: photoURL,
        uid,
      };

      const productsData = {
        name: `${year} ${vehicleMake} ${vehicleModel}`,
        price: price.trim(),
        brand: vehicleMake,
        details: details.trim(),
        status: 'pending',
        category: vehicleCategory,
        condition,
        vin,
        lastEdited: new Date(),
        location: {
          locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
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
        isPromoted: false,
        postedFrom: 'web',
        itemType: 'vehicles',
        vendor: vendorData,
        datePosted: new Date(),
        mainCategory: vehicleCategory,
      };

      setLocation(initialLocation);
      setVehicleData(initialState);
      e.target.reset();

      const productId = nanoid();

      await setDoc(doc(db, 'products', productId), productsData);

      dispatch(addNewProduct({ ...productsData, id: productId }));

      const userRef = doc(db, 'vendors', uid);
      await updateDoc(userRef, {
        productsPosted: increment(1),
      });

      successToast(`Your item, ${year} ${vehicleMake} ${vehicleModel} Posted successfully!`);

      console.log('new item', productsData);

      setIsPosting(false);
      navigate('/');
    } catch (error) {
      setIsPosting(false);
      console.log('cannot submit form', error.message);
      errorToast('Error submitting form. Please try again.');
    }
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmitNewItem}>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label className="new-item-form__label">Vehicle Type</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="vehicleCategory"
              value={vehicleCategory}
              onChange={handleChangeCategory}
            >
              { Object.keys(vehiclesArray).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label className="new-item-form__label">Vehicle Make</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="vehicleMake"
              value={vehicleMake}
              onChange={handleChangeVehicleMake}
            >
              { Object.keys(vehiclesArray[vehicleCategory]).map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label className="new-item-form__label">Vehicle Model</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="vehicleMake"
              value={vehicleModel}
              onChange={handleChangeVehicleModel}
            >
              { vehiclesArray[vehicleCategory][vehicleMake].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label className="new-item-form__label">Vehicle Condition</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              onChange={handleVehicleDataChange}
              value={vehicleData.condition}
              name="condition"
            >
              <option value="new">New</option>
              <option value="slightly used">Slightly Used</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Vehicle Price</label>
            <input
              id="price-input"
              className="new-item-form__input"
              placeholder="eg. 32000"
              onChange={handleVehicleDataChange}
              value={vehicleData.price}
              name="price"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="year-input" className="new-item-form__label">Vehicle Year</label>
            <input
              id="year-input"
              className="new-item-form__input"
              placeholder="eg. 2022"
              onChange={handleVehicleDataChange}
              value={vehicleData.year}
              name="year"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="VIN-input" className="new-item-form__label">VIN</label>
            <input
              id="VIN-input"
              className="new-item-form__input"
              value={vehicleData.vin}
              onChange={handleVehicleDataChange}
              placeholder="eg. 1HGBH41JXMN109186"
              name="vin"
            />
          </div>
        </div>
        <GeoGetter location={location} setLocation={setLocation} />
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Item Detail</h6>
              <span className={(vehicleData.details.length <= 300) ? '' : 'new-item-form__label new-item-form__span--alt'}>{`( ${vehicleData.details.length} / 300 )`}</span>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your item, such as color, brand, model and other useful information."
              name="details"
              value={vehicleData.details}
              onChange={handleVehicleDataChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__upload-image-div d-flex">
            <label className="new-item-form__label">
              Upload Image
              {' '}
              <span>(Upload up to 5 images of 5mb or less in size)</span>
            </label>
            <div className="new-item-form__file-input-outer-div">

              <div className="new-item-form__file-input-div">
                {!vehicleData.images[0] && (
                  <label htmlFor="file-input-1">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                        {' '}
                        <span> ( Cover Image ) </span>
                      </h6>
                    </div>
                  </label>
                )}
                {vehicleData.images[0] && (
                  <div className="new-item-form__preview-div">
                    <img src={vehicleData.images[0].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(0)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-1"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 0)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!vehicleData.images[1] && (
                  <label htmlFor="file-input-2">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {vehicleData.images[1] && (
                  <div className="new-item-form__preview-div">
                    <img src={vehicleData.images[1].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(1)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-2"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 1)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!vehicleData.images[2] && (
                  <label htmlFor="file-input-3">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {vehicleData.images[2] && (
                  <div className="new-item-form__preview-div">
                    <img src={vehicleData.images[2].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(2)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-3"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 2)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!vehicleData.images[3] && (
                  <label htmlFor="file-input-4">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {vehicleData.images[3] && (
                  <div className="new-item-form__preview-div">
                    <img src={vehicleData.images[3].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(3)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-4"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 3)}
                />
              </div>

              <div className="new-item-form__file-input-div">
                {!vehicleData.images[4] && (
                  <label htmlFor="file-input-5">
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                      </h6>
                    </div>
                  </label>
                )}
                {vehicleData.images[4] && (
                  <div className="new-item-form__preview-div">
                    <img src={vehicleData.images[4].preview} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(4)}
                    >
                      X
                    </button>
                  </div>
                )}
                <input
                  id="file-input-5"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="new-item-form__upload-image-input"
                  onChange={(e) => handleChangeImage(e, 4)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Promote Item</label>
            <div className="new-item-form__radio-inner-button-div">
              <button
                type="button"
                onClick={() => setVehicleData({ ...vehicleData, isPromoted: false })}
                className={vehicleData.isPromoted ? 'new-item-form__radio-inner-button-div__radio-button' : 'new-item-form__radio-inner-button-div__radio-button active'}
              >
                <h6>Do not promote item</h6>
                <h4>Post for free</h4>
                {!vehicleData.isPromoted && (<div className="new-item-form__radio-inner-button-div__button-icon"><i className="fa-solid fa-check" /></div>)}
              </button>
              <button
                type="button"
                onClick={() => setVehicleData({ ...vehicleData, isPromoted: true })}
                className={vehicleData.isPromoted ? 'new-item-form__radio-inner-button-div__radio-button  active' : 'new-item-form__radio-inner-button-div__radio-button'}
              >
                <h6>Promote item</h6>
                <h4>$8 for 15 days</h4>
                {vehicleData.isPromoted && (<div className="new-item-form__radio-inner-button-div__button-icon"><i className="fa-solid fa-check" /></div>)}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            {(!vehicleData.isPromoted) && (<button className="new-item-form__post-item-button" type="submit">{isPosting ? '...Posting' : 'Post Item'}</button>)}
            {(vehicleData.isPromoted) && (<button className="new-item-form__post-item-button" type="button" onClick={() => console.log(redirectToCheckout)}>{isCheckingOut ? '...Loading' : 'Checkout'}</button>)}
          </div>
        </div>
      </div>
    </form>
  );
}
