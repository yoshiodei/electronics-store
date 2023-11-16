import React, { useEffect, useState } from 'react';
import ReactCountriesFlags from 'react-countries-flags';
import countryCodes from 'country-codes-list';

export default function CountryCodeList({
  toggleCodeList, setToggleCodeList, setCurrentCountryCode,
}) {
  const [countryCodeList, setCountryCodeList] = useState([]);

  useEffect(() => {
    const myCountryCodesObject = countryCodes.customList('countryCode', '{countryCode}: {countryNameEn}: +{countryCallingCode}');

    const countryCodeArray = Object.keys(myCountryCodesObject).map((key) => {
      const [abbreviation, name, code] = myCountryCodesObject[key].split(': ');
      return { abbreviation, name, code };
    });

    console.log('country code array', countryCodeArray);
    setCountryCodeList(countryCodeArray);
  }, []);

  const handleSetCountryCode = (codeObj) => {
    setCurrentCountryCode(codeObj);
    setToggleCodeList(false);
  };

  if (!toggleCodeList) {
    return null;
  }

  return (
    <ul className="buttons-box__country-code-list">
      {
        countryCodeList.map((country) => (
          <li className="buttons-box__country-code-list-item" key={country.name}>
            <button type="button" onClick={() => handleSetCountryCode({ abbreviation: country.abbreviation, code: country.code })}>
              <ReactCountriesFlags
                isoCode={country.abbreviation}
                alt={country.abbreviation}
                width={23}
                height={13}
              />
              <p>{`${country.name}:`}</p>
              <p>{`(${country.code})`}</p>
            </button>
          </li>
        ))
      }
    </ul>
  );
}
