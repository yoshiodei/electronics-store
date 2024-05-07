import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from '@firebase/firestore';
import { selectAuthState } from '../../../redux/slice/authSlice';
import { errorToast, successToast } from '../../../utils/Toasts';
import { selectProductsState } from '../../../redux/slice/productsSlice';
import { db } from '../../../config/firebaseConfig';

export default function FormItems() {
  const { userCoordinate } = useSelector(selectProductsState);
  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const [isLoading, setIsLoading] = useState(false);
  const { uid } = loginInfo;
  const { displayName, photoURL } = userInfo;

  const navigate = useNavigate();

  const initialRequest = {
    name: '',
    details: '',
  };

  const [itemType, setItemType] = useState('electronics');
  const [request, setRequest] = useState(initialRequest);
  const [upperLimit, setUpperLimit] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (request.name.trim().length === 0 || request.details.trim().length === 0) {
      errorToast('Text field cannot be left empty');
      return null;
    }
    if (isNaN(lowerLimit) || isNaN(upperLimit)) {
      errorToast('Price Range is not a number');
      return null;
    }
    if (Number(lowerLimit) > Number(upperLimit)) {
      errorToast('upper limit price must be more than lower limit price');
      return null;
    }
    const newRequest = {
      ...request,
      Type: 'BRequest',
      itemType,
      category: itemType,
      priceRange: {
        upperLimit: upperLimit === '' ? 0 : Number(upperLimit),
        lowerLimit: lowerLimit === '' ? 0 : Number(lowerLimit),
      },
      datePosted: new Date(),
      lastEdited: new Date(),
      postedFrom: 'web',
      location: {
        locationIsSet: (userCoordinate?.longitude !== 0) || location.locationIsSet,
        country: location.country || null,
        state: location.state || null,
        town: location.town || null,
        coordinates: {
          longitude: userCoordinate?.longitude || null,
          latitude: userCoordinate?.latitude || null,
        },
      },
      status: 'pending',
      vendor: {
        displayName,
        uid,
        photoURL,
      },
    };

    try {
      setIsLoading(true);
      await addDoc(collection(db, 'BuyerRequest'), newRequest);

      successToast('Request has been sent successfully');
      navigate('/request-item-list');
      setRequest(initialRequest);
      setItemType('electronics');
      setUpperLimit('');
      setLowerLimit('');
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      errorToast('Sorry, your request could not be added, try again later');
      setIsLoading(false);
      return null;
    }

    return null;
  };

  return (
    <form
      className="new-item-form"
      onSubmit={handleSubmit}
    >
      <div className="row g-4">
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="name-input" className="new-item-form__label">
              Item Name*
            </label>
            <input
              id="name-input"
              className="new-item-form__input"
              placeholder="eg. Playstation 5S"
              name="name"
              value={request.name}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label new-item-form__label--alt">
              <h6>Item Detail*</h6>
            </label>
            <textarea
              className="new-item-form__textarea"
              placeholder="Write a suitable description for your item, such as color, brand, model and other useful information."
              name="details"
              value={request.details}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__input-div">
            <label htmlFor="name-input" className="new-item-form__label">
              Price Range
            </label>
            <div className="new-item-form__input-div__input-inner-div--alt">
              <div className="new-item-form__input-div__input-inner-div--alt__sub-div">
                <h3>$</h3>
                <input
                  className="new-item-form__input"
                  placeholder="0 (lower limit)"
                  value={lowerLimit}
                  onChange={(e) => setLowerLimit(e.target.value)}
                />
              </div>
              <div className="new-item-form__input-div__input-inner-div--alt__sub-div--alt">
                <h3>to</h3>
              </div>
              <div className="new-item-form__input-div__input-inner-div--alt__sub-div">
                <h3>$</h3>
                <input
                  className="new-item-form__input"
                  placeholder="500 (upper limit)"
                  value={upperLimit}
                  onChange={(e) => setUpperLimit(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Item Type*</label>
            <div className="new-item-form__radio-inner-button-div alt">
              <button
                type="button"
                onClick={() => setItemType('electronics')}
                className={itemType === 'electronics' ? 'new-item-form__radio-inner-button-div__radio-button--item-type active' : 'new-item-form__radio-inner-button-div__radio-button--item-type'}
              >
                <div className="active-spot" />
                <h6>Electronics</h6>
              </button>
              <button
                type="button"
                onClick={() => setItemType('vehicles')}
                className={itemType === 'vehicles' ? 'new-item-form__radio-inner-button-div__radio-button--item-type active' : 'new-item-form__radio-inner-button-div__radio-button--item-type'}
              >
                <div className="active-spot" />
                <h6>Vehicles</h6>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            <button
              className="new-item-form__post-item-button"
              type="submit"
            >
              {isLoading ? '...loading' : 'Add Request'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
