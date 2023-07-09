import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getDownloadURL, uploadBytes, ref as sRef } from 'firebase/storage';
import { doc, updateDoc } from '@firebase/firestore';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import profile from '../../assets/images/profile.jpg';
import { selectAuthState } from '../../redux/slice/authSlice';
import { db, storage } from '../../config/firebaseConfig';

export default function Main() {
  const [isPosting, setIsPosting] = useState(false);
  const {
    isLoggedIn, displayName, userImage, bio, docId,
  } = useSelector(selectAuthState);

  const initialData = {
    bio,
    displayName,
    userImage,
    previewImage: '',
    docId,
    isLoggedIn,
  };
  const [data, setData] = useState(initialData);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleRemoveImage = () => {
    setData((prevState) => ({
      ...prevState,
      userImage: '',
      previewImage: '',
    }));
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 1048576) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImage = {
          file,
          preview: reader.result,
        };
        setData((prevState) => ({
          ...prevState,
          previewImage: updatedImage,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select an image less than 1MB.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsPosting(true);

    try {
      const storageRef = sRef(storage, 'user_images');
      let imageUrl = '';

      if (data?.previewImage.preview) {
        const image = data?.previewImage;
        const fileRef = sRef(storageRef, image.file.name);
        await uploadBytes(fileRef, image.file);
        const downloadUrl = await getDownloadURL(fileRef);
        imageUrl = downloadUrl;
      }

      const vendorRef = doc(db, 'vendors', docId);

      await updateDoc(vendorRef, {
        bio: data.bio,
        displayName: data.displayName,
        image: imageUrl,
      });

      toast.success('Vendor updated successfully!', {
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

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Edit Profile</ContentInfoBox>
          <form className="edit-profile__form" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="edit-profile__edit-image-div mb-4">
                  <div className="edit-profile__form-image-div">
                    <img src={data.previewImage?.preview || data.userImage || profile} alt="user" />
                  </div>
                  <div className="edit-profile__edit-image-buttons-div">
                    <input
                      id="edit-input"
                      type="file"
                      className="edit-profile__input"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handleChangeImage(e, 0)}
                    />
                    <label className="edit-profile__update-image-button" htmlFor="edit-input">
                      <i className="fa-solid fa-pen-to-square" />
                      <h6>Update Image</h6>
                    </label>
                    <button
                      className="edit-profile__remove-image-button"
                      type="button"
                      onClick={handleRemoveImage}
                    >
                      <i className="fa-solid fa-trash" />
                      <h6>Remove Image</h6>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="new-item-form__input-div mb-4">
                  <label htmlFor="displayName-input" className="new-item-form__label">Display Name</label>
                  <input
                    id="displayName-input"
                    className="new-item-form__input"
                    placeholder="please enter your name"
                    name="displayName"
                    value={data.displayName}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="new-item-form__textarea-div">
                  <label className="new-item-form__label new-item-form__label--alt">
                    <h6>Bio</h6>
                    <span className={(data.bio.length <= 300) ? '' : 'new-item-form__label new-item-form__span--alt'}>{`( ${data.bio.length} / 300 )`}</span>
                  </label>
                  <textarea
                    className="new-item-form__textarea"
                    name="bio"
                    value={data.bio}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            <button className="new-item-form__post-item-button mt-4" type="submit">
              {isPosting ? '...Updating' : 'Update Item'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
