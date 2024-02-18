import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemType } from '../../../redux/slice/itemTypeSlice';

export default function ItemTypeToggleButton() {
  const [itemType, setType] = useState('Electronics');
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (itemType === 'Cars') {
      setType('Electronics');
      dispatch(setItemType('electronics'));
    }
    if (itemType === 'Electronics') {
      setType('Cars');
      dispatch(setItemType('cars'));
    }
  };

  const setToElectronics = () => {
    setType('Electronics');
    dispatch(setItemType('electronics'));
  };

  const setToCars = () => {
    setType('Cars');
    dispatch(setItemType('cars'));
  };

  return (
    <div className="item-type-button__outer-div">
      <div className="item-type-button">
        <button type="button" onClick={handleToggle} className={`item-type-button__top-button ${itemType === 'Cars' ? 'cars' : ''}`}>{itemType}</button>
        <div className="item-type-button__bottom-button-div">
          <button type="button" onClick={setToElectronics} className="item-type-button__bottom-button-left">Electronics</button>
          <button type="button" onClick={setToCars} className="item-type-button__bottom-button-right">Cars</button>
        </div>
      </div>
    </div>
  );
}
