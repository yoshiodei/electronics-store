/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import ReactCountriesFlags from 'react-countries-flags';
import carret from '../../../assets/images/Carret.svg';
import CountryCodeList from '../../Register/components/CountryCodeList';

export default function PhoneNumberVerifyInput(
  {
    handleFormDataChange, currentCountryCode, setCurrentCountryCode, formData,
  },
) {
  const [toggleCodeList, setToggleCodeList] = useState(false);

  return (
    <div className="buttons-box__phone-input-div">
      <label>
        Phone Number
      </label>
      <div className="buttons-box__inner-phone-input-div">
        <div className="buttons-box__country-code-div">
          <ReactCountriesFlags
            isoCode={currentCountryCode.abbreviation}
            alt={currentCountryCode.abbreviation}
            width={23}
            height={13}
          />
          <p>{`${currentCountryCode.abbreviation} (${currentCountryCode.code})`}</p>
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
        <CountryCodeList
          toggleCodeList={toggleCodeList}
          setToggleCodeList={setToggleCodeList}
          setCurrentCountryCode={setCurrentCountryCode}
        />
      </div>
    </div>
  );
}
