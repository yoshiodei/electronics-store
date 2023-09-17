import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
// import ContentInfoBox from '../../components/ContentInfoBox';
import UserDetailBox from './component/UserDetailBox';
import ProductsTab from './component/ProductsTab';
import { selectAuthState } from '../../redux/slice/authSlice';
// import VerifyCard from './component/VerifyCard';
// import DisplayProducts from './component/DisplayProducts';
// import PremiumAccountBox from './component/PremiumAccountBox';

export default function Main() {
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  // const { emailVerified } = userInfo;
  const { uid } = loginInfo;

  // const emailVerifiedJSON = localStorage.getItem('emailVerified');
  // const isEmailVerified = JSON.parse(emailVerifiedJSON);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <UserDetailBox />
          {/* <PremiumAccountBox /> */}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          {/* <VerifyCard /> */}
          <div className="main-section__mobile-div">
            <UserDetailBox />
            {/* <PremiumAccountBox /> */}
          </div>
          {/* <ContentInfoBox>All Posts</ContentInfoBox>
          <DisplayProducts /> */}
          {}
          <ProductsTab uid={uid} id={id} />
        </div>
      </main>
    </div>
  );
}
