/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import ReactCountriesFlags from 'react-countries-flags';
import carret from '../../../assets/images/Carret.svg';
import CountryCodeList from './CountryCodeList';
import { handleSendVerificationCode } from '../../utils/NumberVerification';

export default function PhoneNumberVerifyInput(
  {
    handleFormDataChange,
    currentCountryCode,
    setCurrentCountryCode,
    formData,
    setIsPhoneVerified,
  },
) {
  const [toggleCodeList, setToggleCodeList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="buttons-box__phone-input-div">
      <label>
        Phone Number
        {' '}
        <span>*required</span>
      </label>
      <div className="buttons-box__inner-phone-input-div">
        <div className="buttons-box__country-code-div">
          <ReactCountriesFlags
            isoCode={currentCountryCode.abbreviation}
            alt={currentCountryCode.abbreviation}
            width={23}
            height={13}
          />
          <p className="buttons-box__country-code-text">{`${currentCountryCode.abbreviation} (${currentCountryCode.code})`}</p>
          <p className="buttons-box__country-code-text--mobile">{`(${currentCountryCode.code})`}</p>
          <button
            type="button"
            className="buttons-box__phone-input-carret-button"
            onClick={() => setToggleCodeList(!toggleCodeList)}
          >
            <img src={carret} alt="carret" />
          </button>
        </div>
        <input
          placeholder="eg. 0572940523"
          className="buttons-box__phone-input"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleFormDataChange}
        />
        <button
          type="button"
          className="buttons-box__verify-phone-number-button"
          onClick={() => {
            handleSendVerificationCode(
              currentCountryCode.code,
              formData.phoneNumber,
              setIsPhoneVerified,
              setIsLoading,
            );
          }}
        >
          {isLoading ? '...loading' : 'Verify'}
        </button>
        <CountryCodeList
          toggleCodeList={toggleCodeList}
          setToggleCodeList={setToggleCodeList}
          setCurrentCountryCode={setCurrentCountryCode}
        />
      </div>
      <button
        type="button"
        className="buttons-box__verify-phone-number-button--mobile"
        onClick={() => {
          handleSendVerificationCode(
            currentCountryCode.code,
            formData.phoneNumber,
            setIsPhoneVerified,
            setIsLoading,
          );
        }}
      >
        {isLoading ? '...loading' : 'Verify'}
      </button>
    </div>
  );
}
