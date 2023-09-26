import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { selectAuthState, setUserInfo } from '../redux/slice/authSlice';
import { auth } from '../config/firebaseConfig';

export default function DrawerButton({
  toggleDrawer, setToggleDrawer, handleShowSignInModal,
  handleShowRegisterModal, notificationCount, wishListCount,
  messageCount,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setToggleDrawer(false);
  };

  const handleMenuButtonClick = (title) => {
    switch (title) {
      case 'my-account':
        navigate(`/user-account/${uid}`);
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'wish-list':
        navigate('/wish-list');
        break;
      case 'messages':
        navigate('/chatlist/mobile');
        break;
      case 'log-out':
        signOut(auth).then(() => {
          const userInfo = {
            emailVerified: false,
            userInfoIsSet: false,
            displayName: '',
            bio: '',
            email: '',
            followers: '',
            rating: '',
            phoneNumber: '',
            photoURL: '',
          };
          dispatch(setUserInfo(userInfo));

          const dataToStore = { isAnonymous: true };
          const dataJSON = JSON.stringify(dataToStore);

          const storeEmailVerifyValue = { emailVerified: false };
          const storeEmailVerifyValueJSON = JSON.stringify(storeEmailVerifyValue);

          const storeNotificationsCounts = { messageCount: 0, notificationCount: 0 };
          const storeNotificationsCountsJSON = JSON.stringify(storeNotificationsCounts);

          const storeWishListCount = { wishList: 0 };
          const storeWishListCountJSON = JSON.stringify(storeWishListCount);

          // localStorage.removeItem('emailVerified');
          localStorage.setItem('isAnonymous', dataJSON);
          localStorage.setItem('emailVerified', storeEmailVerifyValueJSON);
          localStorage.setItem('notificationsCounts', storeNotificationsCountsJSON);
          localStorage.setItem('wishListCount', storeWishListCountJSON);

          navigate('/');
          toast.success('Logout Successful', {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }).catch((error) => {
          toast.error(error.message, {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
        break;
      default:
        navigate('/');
        break;
    }

    setToggleDrawer(false);
  };

  const handleSearch = () => {
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
    }
    setSearch('');
    setToggleDrawer(false);
  };

  return (
    <>
      <button type="button" className="drawer-button" onClick={() => setToggleDrawer(!toggleDrawer)}>
        <div className="drawer-button__line" />
        <div className="drawer-button__line" />
        <div className="drawer-button__line" />
      </button>
      <div className={toggleDrawer ? 'drawer-button__div' : 'drawer-button__div__hide'}>
        <div className="drawer-button__input-div">
          <input
            value={search}
            className="drawer-button__input"
            placeholder="Search item"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="drawer-button__input-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {isAnonymous && (
        <div className="drawer-button__sign-in-div">
          <button type="button" className="drawer-button__sign-in-button" onClick={handleShowSignInModal}>Sign In</button>
          <button type="button" className="drawer-button__register-button" onClick={handleShowRegisterModal}>Register</button>
        </div>
        )}
        {!isAnonymous
         && (
         <div className="drawer-button__menu-div">
           <h5>Profile Menu</h5>
           <ul>
             <li className="drawer-button__menu-item">
               <button type="button" onClick={() => handleMenuButtonClick('my-account')}>
                 <div className="drawer-button__menu-item__button-div">
                   <i className="fa-solid fa-user" />
                   <h6>my account</h6>
                 </div>
                 <i className="fa-solid fa-chevron-right" />
               </button>
             </li>
             <li className="drawer-button__menu-item">
               <button type="button" onClick={() => handleMenuButtonClick('notifications')}>
                 <div className="drawer-button__menu-item__button-div">
                   <i className="fa-solid fa-bell" />
                   <h6>notifications</h6>
                 </div>
                 <div className={(notificationCount > 0) ? 'drawer-button__menu-item__inner-button-div' : 'drawer-button__menu-item__inner-button-div--modified'}>
                   {notificationCount > 0 && (<div className="navbar-custom__mobile-data-count">{ notificationCount }</div>)}
                   <i className="fa-solid fa-chevron-right" />
                 </div>
               </button>
             </li>
             <li className="drawer-button__menu-item">
               <button type="button" onClick={() => handleMenuButtonClick('messages')}>
                 <div className="drawer-button__menu-item__button-div">
                   <i className="fa-solid fa-message" />
                   <h6>messages</h6>
                 </div>
                 <div className={(messageCount > 0) ? 'drawer-button__menu-item__inner-button-div' : 'drawer-button__menu-item__inner-button-div--modified'}>
                   {messageCount > 0 && (<div className="navbar-custom__mobile-data-count">{ messageCount }</div>)}
                   <i className="fa-solid fa-chevron-right" />
                 </div>
               </button>
             </li>
             <li className="drawer-button__menu-item">
               <button type="button" onClick={() => handleMenuButtonClick('wish-list')}>
                 <div className="drawer-button__menu-item__button-div">
                   <i className="fa-solid fa-heart" />
                   <h6>wish list</h6>
                 </div>
                 <div className={(wishListCount > 0) ? 'drawer-button__menu-item__inner-button-div' : 'drawer-button__menu-item__inner-button-div--modified'}>
                   {wishListCount > 0 && (<div className="navbar-custom__mobile-data-count">{ wishListCount }</div>)}
                   <i className="fa-solid fa-chevron-right" />
                 </div>
               </button>
             </li>
           </ul>
         </div>
         )}
        <div className="drawer-button__menu-div">
          <h5>Categories</h5>
          <ul>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('phones')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-mobile" />
                  <h6>phones</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('televisions')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-tv" />
                  <h6>televisions</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('desktops')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-desktop" />
                  <h6>desktops</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('laptops')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-laptop" />
                  <h6>laptops</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('gaming consoles')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-gamepad" />
                  <h6>gaming consoles</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('headphones-and-speakers')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-headphones" />
                  <h6>headphones and speakers</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleCategoryClick('accessories')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-puzzle-piece" />
                  <h6>accessories</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        { !isAnonymous && (
        <div className="drawer-button__sign-out-div">
          <button type="button" className="drawer-button__sign-out-button" onClick={() => handleMenuButtonClick('log-out')}>Sign Out</button>
        </div>
        )}
      </div>
    </>
  );
}
