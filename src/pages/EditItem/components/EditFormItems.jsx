/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import { toast } from 'react-toastify';
import {
  addDoc, collection, deleteDoc, doc,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';
import { selectProductsState } from '../../../redux/slice/productsSlice';
// import { selectAuthState } from '../../../redux/slice/authSlice';
import Uneditable from './Uneditable';
import categoryObj from '../../NewItem/components/categoryObj';
import { db, storage } from '../../../config/firebaseConfig';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function EditFormItems() {
  const { productToEdit } = useSelector(selectProductsState);
  const { id } = useParams();

  // const { loginInfo: uid } = useSelector(selectAuthState);

  console.log('item to edit is', productToEdit);

  const [item, setItem] = useState(productToEdit);
  const [selectedCategory, setSelectedCategory] = useState(productToEdit.category);
  const [selectedBrand, setSelectedBrand] = useState(productToEdit.brand);
  const [previewImages, setPreviewImages] = useState([]);
  const [otherBrand, setOtherBrand] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { displayName, photoURL } = userInfo;

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedBrand(categoryObj[category][0]);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setOtherBrand('');
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    const updatedImages = [...item.images];
    updatedImages[index] = null;
    updatedPreviews[index] = null;
    setItem((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
    setPreviewImages([...updatedPreviews]);
  };

  const handleChangeImage = (e, index) => {
    const file = e.target.files[0];

    if (file && file.size <= 5242880) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...item.images];
        updatedImages[index] = {
          file,
          preview: reader.result,
        };
        console.log('the updated image is this ==> ', index, updatedImages);
        setItem((prevState) => ({
          ...prevState,
          images: updatedImages,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select an image less than 5MB.');
      toast.error('Selected image size is more than 5MB.', {
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

  const handleEdit = async (e) => {
    e.preventDefault();

    const {
      name, price, details, images, condition, isPromoted, location,
    } = item;

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

      const imageString = [];
      const imageObject = [];

      for (let i = 0; i < item.images.length; i += 1) {
        if (typeof item.images[i] === 'string') {
          imageString.push(item.images[i]);
        }
        if (item?.images[i]?.file) {
          imageObject.push(item.images[i]);
        }
      }

      for (let j = 0; j < imageObject.length; j += 1) {
        const image = imageObject[j];
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrls.push(downloadUrl);
      }

      const collectionRef = collection(db, 'pendingItems');

      let itemBrand;
      if (selectedBrand === 'other') {
        itemBrand = otherBrand;
      } else {
        itemBrand = selectedBrand;
      }

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
        brand: itemBrand,
        price: price.trim(),
        images: [...imageString, ...imageUrls],
        vendor: vendorData,
        datePosted: Date.now(),
        dateLastEdited: Date.now(),
        vendorId: uid,
        status: 'pending',
        location: {
          locationIsSet: location.locationIsSet,
          locationName: `${location.town}, ${location.state}`,
          country: location.country,
          state: location.state,
          town: location.town,
          coordinates: {
            longitude: location?.coordinates?.longitude ? location?.coordinates?.longitude : 0,
            latitude: location?.coordinates?.latitude ? location?.coordinates?.latitude : 0,
          },
        },
      };

      console.log('final object', productsData);
      await addDoc(collectionRef, productsData);
      await deleteDoc(doc(db, 'products', id));

      toast.success('Item successfully sent for a review', {
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'isPromoted':
        setItem({ ...item, isPromoted: (value === 'promote') });
        // console.log('This is the changed item', item);
        break;
      default:
        setItem({ ...item, [name]: value });
        // console.log(newItem);
        break;
    }
  };

  useEffect(() => {
    function populateArray(arr) {
      const remainingSlots = 5 - arr.length;

      if (remainingSlots <= 0) {
        return arr;
      }

      const additionalElements = new Array(remainingSlots).fill(null);
      console.log('new array', arr.concat(additionalElements));
      return arr.concat(additionalElements);
    }

    setItem({ ...item, images: populateArray(item.images) });
  }, []);

  if (!item.name) {
    return (<Uneditable />);
  }

  return (
    <form className="new-item-form" onSubmit={handleEdit}>
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
              value={item.name}
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
              value={item.price}
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
              value={item.condition}
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
            <label htmlFor="category" className="new-item-form__label">Item Category</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="category"
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
            <label htmlFor="brand" className="new-item-form__label">Item Brand</label>
            <select
              className="new-item-form__input"
              aria-label="Default select example"
              name="brand"
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
        {(selectedBrand === 'other') && (
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="other-brand-input" className="new-item-form__label">
              Please Specify the Item Brand
            </label>
            <input
              id="other-brand-input"
              className="new-item-form__input"
              placeholder="please type the name of your brand"
              name="other"
              value={otherBrand}
              onChange={(e) => setOtherBrand(e.target.value)}
            />
          </div>
        </div>
        )}
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Item Detail</h6>
              <span className={(item.details.length <= 300) ? '' : 'new-item-form__label new-item-form__span--alt'}>{`( ${item.details.length} / 300 )`}</span>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your item, such as color, brand, model and other useful information."
              name="details"
              value={item.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <label className="new-item-form__label">
            Upload Image
            {' '}
            <span>(Upload up to 5 images of 5mb or less in size)</span>
          </label>
          <div className="new-item-form__file-input-outer-div">
            {
              item.images.map((image, index) => (
                <div className="new-item-form__file-input-div">
                  {!(image || image?.preview) && (
                  <label htmlFor={`file-input-${index}`}>
                    <div>
                      <i className="fa-solid fa-camera" />
                      <h6>
                        Add Image
                        {' '}
                        {(index === 0) && (<span> ( Cover Image ) </span>)}
                      </h6>
                    </div>
                  </label>
                  )}
                  {(image || image?.preview) && (
                  <div className="new-item-form__preview-div">
                    <img src={image?.preview || image} alt="Preview" />
                    <button
                      type="button"
                      className="new-item-form__preview-close-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                  )}
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="new-item-form__upload-image-input"
                    onChange={(e) => handleChangeImage(e, index)}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Promote Item (Current charge for promoting an item is $40 for 30 days)</label>
            <div className="new-item-form__radio-inner-div new-item-form__radio-inner-div--promote">
              <div className="new-item-form__radio-inner-div">
                <input
                  id="dont-promote"
                  className="new-item-form__radio-input"
                  name="isPromoted"
                  type="radio"
                  value="donotpromote"
                  checked={!item.isPromoted}
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
                  checked={item.isPromoted}
                  onChange={handleFormChange}
                />
                <label htmlFor="do-promote" className="new-item-form__radio-label">Yes, promote this item</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            {(!item.isPromoted) && (<button className="new-item-form__post-item-button" type="submit" onClick={handleEdit}>{isPosting ? '...Posting' : 'Post Item'}</button>)}
            {(false) && (<button className="new-item-form__post-item-button" type="button" onClick={handleEdit}>checkout</button>)}
          </div>
        </div>
      </div>
    </form>
  );
}
