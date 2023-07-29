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
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';
import GeoGetter from '../../../components/GeoGetter';
import { setPromotedItem } from '../../../redux/slice/productsSlice';
import categoryObj from './categoryObj';

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

  const [selectedCategory, setSelectedCategory] = useState('phones');
  const [selectedBrand, setSelectedBrand] = useState(categoryObj.phones[0]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedBrand(categoryObj[category][0]);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialState = {
    name: '',
    price: '',
    category: 'laptops',
    brand: 'sony',
    details: '',
    images: [],
    condition: 'brand new',
    isPromoted: false,
    datePosted: '',
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

  const [newItem, setNewItem] = useState(initialState);
  const [isPosting, setIsPosting] = useState(false);
  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { displayName, photoURL } = userInfo;

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
      toast.error('Selected image size is more than 1MB.', {
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

  const redirectToCheckout = async () => {
    setIsPosting(true);

    const {
      name, price, details, images,
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

    if (isNaN(price.trim())) {
      toast.error('Price must be a number', {
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

    if (!location.locationIsSet) {
      toast.error('Location has not been set', {
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
    } else {
      setIsPosting(false);

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

        const promotedItem = {
          ...newItem,
          location,
          datePosted: Date.now(),
          images: imageUrls,
          category: selectedCategory,
          brand: selectedBrand,
        };

        dispatch(setPromotedItem(promotedItem));
        console.log(promotedItem);
        navigate('/checkoutform');
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
    }
  };

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();

    const {
      name, price, details, images, condition, isPromoted,
    } = newItem;

    setIsPosting(true);

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

    if (isNaN(price.trim())) {
      toast.error('Price must be a number', {
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

    if (!location.locationIsSet) {
      toast.error('Location has not been set', {
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
        image: photoURL,
        userId: uid,
      };

      const productsData = {
        name: name.trim(),
        details: details.trim(),
        condition,
        isPromoted,
        category: selectedCategory,
        brand: selectedBrand,
        price: price.trim(),
        images: imageUrls,
        vendor: vendorData,
        datePosted: Date.now(),
        vendorId: uid,
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

      toast.success('Item Posted successfully!', {
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
    <form className="new-item-form" onSubmit={handleSubmitNewItem}>
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
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="category2" className="new-item-form__label">Item Category</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="category2"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {Object.keys(categoryObj).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="brand2" className="new-item-form__label">Item Brand</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="brand2"
              value={selectedBrand}
              onChange={handleBrandChange}
            >
              {categoryObj[selectedCategory].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
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
            {/* <input
              id="name-input"
              className="new-item-form__input"
              placeholder=
              name="details"
              value={newItem.details}
              onChange={handleFormChange}
            /> */}
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your item, such as color, brand, model and other useful information."
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
