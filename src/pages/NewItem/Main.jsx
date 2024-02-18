import React from 'react';
import { useSelector } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import FormItems from './components/FormItems';
import PostedItemsCount from './components/PostedItemsCount';
import ItemTypeToggleButton from '../WelcomePage/components/ItemTypeToggleButton';
import { selectItemTypeState } from '../../redux/slice/itemTypeSlice';
import CarsFormItems from './components/CarFormItems';

export default function Main() {
  const { itemType } = useSelector(selectItemTypeState);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ItemTypeToggleButton />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <PostedItemsCount />
          <ContentInfoBox>{`Post New Item - ${itemType === 'cars' ? 'Cars' : 'Electrotoss'}` }</ContentInfoBox>
          {itemType === 'electronics' ? <FormItems /> : <CarsFormItems /> }
        </div>
      </main>
    </div>
  );
}
