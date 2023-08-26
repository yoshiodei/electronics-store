import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductToEdit } from '../../../redux/slice/productsSlice';

export default function EditItemButton({ product, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setProductToEdit(product));
    navigate(`/edit-single-item/${id}`);
  };

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="edit-item-button"
    >
      <i className="fa-regular fa-solid fa-pen-to-square" />
      <h6>Edit Item</h6>
    </button>
  );
}
