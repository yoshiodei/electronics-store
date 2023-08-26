import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import EditFormItems from './components/EditFormItems';
import { setProductToEdit } from '../../redux/slice/productsSlice';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setProductToEdit({}));
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Edit Item</ContentInfoBox>
          <EditFormItems />
        </div>
      </main>
    </div>
  );
}
