import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemType } from '../../../redux/slice/itemTypeSlice';

export default function ItemTypeToggleButton() {
  const [itemType, setType] = useState('Electronics');
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (itemType === 'Vehicles') {
      setType('Electronics');
      dispatch(setItemType('electronics'));
    }
    if (itemType === 'Electronics') {
      setType('Vehicles');
      dispatch(setItemType('vehicles'));
    }
  };

  const setToElectronics = () => {
    setType('Electronics');
    dispatch(setItemType('electronics'));
  };

  const setToVehicles = () => {
    setType('Vehicles');
    dispatch(setItemType('vehicles'));
  };

  return (
    <div className="item-type-button__outer-div">
      <div className="item-type-button">
        <button type="button" onClick={handleToggle} className={`item-type-button__top-button ${itemType === 'Vehicles' ? 'cars' : ''}`}>{itemType}</button>
        <div className="item-type-button__bottom-button-div">
          <button type="button" onClick={setToElectronics} className="item-type-button__bottom-button-left">Electronics</button>
          <button type="button" onClick={setToVehicles} className="item-type-button__bottom-button-right">Vehicles</button>
        </div>
      </div>
    </div>
  );
}
