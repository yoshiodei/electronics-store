import React from 'react';

export default function FormItems() {
  return (
    <form className="new-item-form">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="name-input" className="new-item-form__label">Item Name</label>
            <input id="name-input" className="new-item-form__input" placeholder="eg. John Doe" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__input-div">
            <label htmlFor="price-input" className="new-item-form__label">Item Price</label>
            <input id="price-input" className="new-item-form__input" placeholder="eg. $ 150" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__textarea-div">
            <label className="new-item-form__label">Item Detail</label>
            <textarea className="new-item-form__textarea" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="new-item-form__radio-div">
            <label htmlFor="price-input" className="new-item-form__label">Item Condition</label>
            <div className="new-item-form__radio-outer-div d-flex">
              <div className="new-item-form__radio-inner-div">
                <input id="brand-new" className="new-item-form__radio-input" name="condition" type="radio" />
                <label htmlFor="brand-new" className="new-item-form__radio-label">Brand New</label>
              </div>
              <div className="new-item-form__radio-inner-div">
                <input id="slightly-used" className="new-item-form__radio-input" name="condition" type="radio" />
                <label htmlFor="slightly-used" className="new-item-form__radio-label">Slightly Used</label>
              </div>
              <div className="new-item-form__radio-inner-div">
                <input id="used" className="new-item-form__radio-input" name="condition" type="radio" />
                <label htmlFor="used" className="new-item-form__radio-label">Used</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__upload-image-div d-flex">
            <label className="new-item-form__label">Upload Image</label>
            <input type="file" className="new-item-form__upload-image-input" />
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__promote-item-div d-flex">
            <label className="new-item-form__label">Promote Item</label>
            <div className="new-item-form__radio-inner-div new-item-form__radio-inner-div--promote">
              <div className="new-item-form__radio-inner-div">
                <input id="dont-promote" className="new-item-form__radio-input" name="promote" type="radio" />
                <label htmlFor="dont-promote" className="new-item-form__radio-label">No, do not promote this item</label>
              </div>
              <div className="new-item-form__radio-inner-div">
                <input id="do-promote" className="new-item-form__radio-input" name="promote" type="radio" />
                <label htmlFor="do-promote" className="new-item-form__radio-label">Yes, promote this item</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="new-item-form__post-item-div">
            <button className="new-item-form__post-item-button" type="button">Post Item</button>
          </div>
        </div>
      </div>
    </form>
  );
}
