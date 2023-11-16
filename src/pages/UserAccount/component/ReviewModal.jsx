/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function ReviewModal({ showReviewModal, handleCloseReviewModal, ratings }) {
  const [rating, setRating] = useState(0);
  const [newRate, setNewRate] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { displayName } = userInfo;

  const { id } = useParams();

  const handleMouseOver = (rate1) => {
    if (newRate > rate1) {
      setRating(newRate);
    } else { setRating(rate1); }
  };

  const handleMouseOut = () => {
    setRating(newRate);
  };

  const handleClick = (rate3) => {
    setRating(rate3);
    setNewRate(rate3);
  };

  const reviewData = {
    createdAt: new Date(),
    message: review,
    rating,
    reviewerId: uid,
    reviewerName: displayName?.split(' ')[0],
  };

  const isValid = async () => {
    const querySnapshot = await getDocs(collection(db, 'vendors', id, 'reviews'));
    const allReviews = [];
    querySnapshot.forEach((doc) => {
      const reviewObject = doc.data();
      allReviews.push(reviewObject);
    });

    if (allReviews.length > 0) {
      errorToast('You have already reviewed this user');

      setNewRate(0);
      setRating(0);
      setReview('');

      return false;
    }

    if (rating !== 0) {
      errorToast('You have not rated this user');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      const valid = await isValid();

      if (valid) {
        setLoading(true);
        await addDoc(collection(db, 'vendors', id, 'reviews'), reviewData);

        const userRef = doc(db, 'vendors', id);
        const updatedRating = [...ratings, rating];
        await updateDoc(userRef, {
          ratings: updatedRating,
        });

        setNewRate(0);
        setRating(0);
        setReview('');

        setLoading(false);

        successToast('Review has been sent successfully');
        handleCloseReviewModal();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorToast('Sorry, Unable to add your review');
    }
  };

  return (
    <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="buttons-box__modal-header">{`Rate user ${displayName?.split(' ')[0]}`}</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <form className="buttons-box__form">
            <div className="buttons-box__star-rating-div">
              <h6>
                Add your rating
              </h6>
              <div className="buttons-box__star-rating-inner-div">
                <div
                  className="buttons-box__star-rating-icon-div"
                  onMouseOver={() => handleMouseOver(1)}
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => handleClick(1)}
                >
                  <i className={`fa-solid fa-star ${(rating > 0) ? 'active' : ''}`} />
                </div>
                <div
                  className="buttons-box__star-rating-icon-div"
                  onMouseOver={() => handleMouseOver(2)}
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => handleClick(2)}
                >
                  <i className={`fa-solid fa-star ${(rating > 1) ? 'active' : ''}`} />
                </div>
                <div
                  className="buttons-box__star-rating-icon-div"
                  onMouseOver={() => handleMouseOver(3)}
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => handleClick(3)}
                >
                  <i className={`fa-solid fa-star ${(rating > 2) ? 'active' : ''}`} />
                </div>
                <div
                  className="buttons-box__star-rating-icon-div"
                  onMouseOver={() => handleMouseOver(4)}
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => handleClick(4)}
                >
                  <i className={`fa-solid fa-star ${(rating > 3) ? 'active' : ''}`} />
                </div>
                <div
                  className="buttons-box__star-rating-icon-div"
                  onMouseOver={() => handleMouseOver(5)}
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => handleClick(5)}
                >
                  <i className={`fa-solid fa-star ${(rating > 4) ? 'active' : ''}`} />
                </div>
              </div>
            </div>
            <label htmlFor="issue" className="mt-3">
              <h6>Write your review here</h6>
            </label>
            <textarea
              className="buttons-box__review-text-area"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </form>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="buttons-box__send-report-button" type="button" onClick={() => handleSubmit()}>
          {loading ? '...loading' : 'Send Report'}
        </button>
        <button className="buttons-box__close-report-button" type="button" onClick={() => handleCloseReviewModal()}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
