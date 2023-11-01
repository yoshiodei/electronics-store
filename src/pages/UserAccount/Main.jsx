import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import UserDetailBox from './component/UserDetailBox';
import ProductsTab from './component/ProductsTab';
import { selectAuthState } from '../../redux/slice/authSlice';
// import VerifyCard from './component/VerifyCard';

export default function Main() {
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

  const [userProductIds, setUserProductIds] = useState([]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <UserDetailBox userProductIds={userProductIds} />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          {/* <VerifyCard /> */}
          <div className="main-section__mobile-div">
            <UserDetailBox />
          </div>
          <ProductsTab uid={uid} id={id} setUserProductIds={setUserProductIds} />
        </div>
      </main>
    </div>
  );
}
