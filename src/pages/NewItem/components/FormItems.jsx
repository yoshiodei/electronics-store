/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import {
  addDoc,
  collection,
} from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db, storage } from '../../../config/firebaseConfig';
// import states from './states';
import brands from './brands';
import { selectAuthState } from '../../../redux/slice/authSlice';
import GeoGetter from '../../../components/GeoGetter';

export default function FormItems() {
  const initialLocation = {
    country: '',
    state: '',
    town: '',
    longitude: '',
    latitude: '',
    locationIsSet: false,
  };

  const [location, setLocation] = useState(initialLocation);

  const navigate = useNavigate();

  const initialState = {
    name: '',
    price: '',
    category: 'laptops',
    brand: 'sony',
    city: '',
    state: 'alabama',
    details: '',
    images: [],
    condition: 'brand new',
    isPromoted: false,
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

  const redirectToCheckout = () => {
    navigate('/checkoutform');
  };

  const [newItem, setNewItem] = useState(initialState);
  const [isPosting, setIsPosting] = useState(false);
  const {
    userId, docId, displayName, userImage,
  } = useSelector(selectAuthState);

  const handleRemoveImage = (index) => {
    const updatedImages = [...newItem.images];
    updatedImages.splice(index, 1);
    setNewItem((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleChangeImage = (e, index) => {
    const file = e.target.files[0];

    if (file && file.size <= 1048576) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...newItem.images];
        updatedImages[index] = {
          file,
          preview: reader.result,
        };
        setNewItem((prevState) => ({
          ...prevState,
          images: updatedImages,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select an image less than 1MB.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'isPromoted':
        setNewItem({ ...newItem, isPromoted: (value === 'promote') });
        console.log(newItem);
        break;
      default:
        setNewItem({ ...newItem, [name]: value });
        console.log(newItem);
        break;
    }
  };

  const handleSubmitNewItemTest = async (e) => {
    e.preventDefault();

    setIsPosting(true);

    const {
      name, price, details, images, condition, isPromoted, brand, category,
    } = newItem;

    if (!name.trim() || !price.trim() || !details.trim()) {
      toast.error('Found empty text fields', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setIsPosting(false);
      return;
    }

    if (images.length === 0) {
      toast.error('No item image selected', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

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

      const collectionRef = collection(db, 'pendingItems');

      const vendorData = {
        displayName,
        image: userImage,
        userId,
      };

      const productsData = {
        name: name.trim(),
        details: details.trim(),
        condition,
        isPromoted,
        category,
        brand,
        price: price.trim(),
        images: imageUrls,
        vendor: vendorData,
        vendorDocId: docId,
        vendorId: userId,
        location: {
          locationIsSet: location.locationIsSet,
          locationName: `${location.town}, ${location.state}`,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: location.longitude,
            latitude: location.latitude,
          },
        },
      };

      setLocation(initialLocation);
      setNewItem(initialState);
      e.target.reset();

      await addDoc(collectionRef, productsData);

      toast.success('Form submitted successfully!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      console.log('new item', productsData);

      setIsPosting(false);
    } catch (error) {
      setIsPosting(false);
      console.log('cannot submit form', error.message);
      toast.error('Error submitting form. Please try again.', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmitNewItemTest}>
      <div className="row g-4">
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="name-input" className="new-item-form__label">
              Item Name
            </label>
            <input
              id="name-input"
              className="new-item-form__input"
              placeholder="eg. Playstation 5S"
              name="name"
              value={newItem.name}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Item Price</label>
            <input
              id="price-input"
              className="new-item-form__input"
              placeholder="eg. $ 150"
              name="price"
              value={newItem.price}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="brand" className="new-item-form__label">Item Brand</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="brand"
              value={newItem.brand}
              onChange={handleFormChange}
            >
              {
               brands.map((state, index) => (
                 <option value={state} key={index}>{state}</option>
               ))
              }
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Item Category</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="category"
              value={newItem.category}
              onChange={handleFormChange}
            >
              <option value="laptops">Laptops</option>
              <option value="phones">Phones</option>
              <option value="televisions">Televisions</option>
              <option value="desktops">Desktops</option>
              <option value="game consoles">Game Consoles</option>
              <option value="headphones and speakers">Headphones and Speakers</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Item Condition</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="condition"
              value={newItem.condition}
              onChange={handleFormChange}
            >
              <option value="brand new">Brand New</option>
              <option value="slightly used">Slightly Used</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>
        <GeoGetter location={location} setLocation={setLocation} />
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Item Detail</h6>
              <span className={(newItem.details.length <= 300) ? '' : 'new-item-form__label new-item-form__span--alt'}>{`( ${newItem.details.length} / 300 )`}</span>
            </label>
            <textarea
              className="new-item-form__textarea"
              name="details"
              value={newItem.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__upload-image-div d-flex">
            <label className="new-item-form__label">
              Upload Image
              {' '}
              <span>(Upload up to 5 images)</span>
            </label>
            <div className="new-item-form__file-input-outer-div">

              <div className="new-item-form__file-input-div">
                {!newItem.images[0] && (
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
                {newItem.images[0] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[0].preview} alt="Preview" />
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
                {!newItem.images[1] && (
                <label htmlFor="file-input-2">
                  <div>
                    <i className="fa-solid fa-camera" />
                    <h6>
                      Add Image
                    </h6>
                  </div>
                </label>
                )}
                {newItem.images[1] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[1].preview} alt="Preview" />
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
                {!newItem.images[2] && (
                <label htmlFor="file-input-3">
                  <div>
                    <i className="fa-solid fa-camera" />
                    <h6>
                      Add Image
                    </h6>
                  </div>
                </label>
                )}
                {newItem.images[2] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[2].preview} alt="Preview" />
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
                {!newItem.images[3] && (
                <label htmlFor="file-input-4">
                  <div>
                    <i className="fa-solid fa-camera" />
                    <h6>
                      Add Image
                    </h6>
                  </div>
                </label>
                )}
                {newItem.images[3] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[3].preview} alt="Preview" />
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
                {!newItem.images[4] && (
                <label htmlFor="file-input-5">
                  <div>
                    <i className="fa-solid fa-camera" />
                    <h6>
                      Add Image
                    </h6>
                  </div>
                </label>
                )}
                {newItem.images[4] && (
                  <div className="new-item-form__preview-div">
                    <img src={newItem.images[4].preview} alt="Preview" />
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
            <div className="new-item-form__radio-inner-div new-item-form__radio-inner-div--promote">
              <div className="new-item-form__radio-inner-div">
                <input
                  id="dont-promote"
                  className="new-item-form__radio-input"
                  name="isPromoted"
                  type="radio"
                  value="donotpromote"
                  checked={!newItem.isPromoted}
                  onChange={handleFormChange}
                />
                <label htmlFor="dont-promote" className="new-item-form__radio-label">No, do not promote this item</label>
              </div>
              <div className="new-item-form__radio-inner-div">
                <input
                  id="do-promote"
                  className="new-item-form__radio-input"
                  name="isPromoted"
                  value="promote"
                  type="radio"
                  checked={newItem.isPromoted}
                  onChange={handleFormChange}
                />
                <label htmlFor="do-promote" className="new-item-form__radio-label">Yes, promote this item</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            {(!newItem.isPromoted) && (<button className="new-item-form__post-item-button" type="submit">{isPosting ? '...Posting' : 'Post Item'}</button>)}
            {(newItem.isPromoted) && (<button className="new-item-form__post-item-button" type="button" onClick={redirectToCheckout}>checkout</button>)}
          </div>
        </div>
      </div>
    </form>
  );
}
