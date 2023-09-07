/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellNowButton from './SellNowButton';
import SignInModal from './SignInModal';
import DrawerButton from './DrawerButton';
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectAuthState, setUserId, setUserInfo } from '../redux/slice/authSlice';
import RegisterModal from './RegisterModal';
import appName from '../Constants/constantVariables';
import appLogo from '../assets/images/electrotossLogoWhite.png';
import { doc, getDoc, onSnapshot } from '@firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { selectWishListState } from '../redux/slice/wishListSlice';
import { selectNotificationState, setNotifications } from '../redux/slice/notificationSlice';
import ChatList from '../pages/ChatRoom/components/ChatList';
import ForgotPasswordModal from './ForgotPasswordModal';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishListCount } = useSelector(selectWishListState);
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { notificationCount, messageCount } = useSelector(selectNotificationState);
  const { isAnonymous, uid } = loginInfo;
  const { emailVerified } = userInfo;
  
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [userData, setUserData ] = useState({});
  
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);
  const handleShowForgotPasswordModal = () => setShowForgotPasswordModal(true);
  const handleCloseForgotPasswordModal = () => setShowForgotPasswordModal(false);

  const handleClickWishList = (e) => {
    navigate('/wish-list');
  }
  
  const initialCountObject = { notificationCount: 0, messageCount: 0 };

  const [countObject, setCountObject] = useState(initialCountObject);

  useEffect(() => {
    if(uid){
    const unsub = onSnapshot(doc(db, 'vendors', uid), (doc) => {
    const notificationCount = doc.data()?.newNotifications?.length || 0;
    const messageCount = doc.data()?.newMessages?.length || 0;
    const wishList = doc.data()?.wishlist?.length || 0;

    const dataJSON = JSON.stringify({ messageCount, notificationCount });
    localStorage.setItem('notificationsCounts', dataJSON);

    const wishListDataJSON = JSON.stringify({ wishList });
    localStorage.setItem('wishListCount', wishListDataJSON);

    setCountObject({ messageCount, notificationCount });
    dispatch(setNotifications({ messageCount, notificationCount }));
  });

    return () => {
      unsub();
    };
  }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("user from auth changed", user);
        dispatch(setUserId({ uid, isAnonymous: false }));

        if ( !userInfo.userInfoIsSet ){

          const docRef = doc(db, 'vendors', uid);
          const docSnapData = await getDoc(docRef);
          const userData = docSnapData.data();

          const userInfo = {
            emailVerified: user?.emailVerified ? user.emailVerified  : '',
            displayName: userData.displayName,
            bio: userData.bio,
            email: userData.email,
            followers: userData.followers,
            rating: userData.rating,
            phoneNumber: userData.phoneNumber,
            photoURL: userData.photoURL,
          };
          dispatch(setUserInfo(userInfo));
        }
      } else {
        dispatch(setUserId({ uid, isAnonymous: true }));
      }
    });
  },[]);

  const handlePopOverClick = (name) => {
    setShowAccountModal(false);

    switch (name) {
      case 'my-account':
        navigate(`/user-account/${uid}`);
        break;
      case 'notifications':
        navigate('/notifications');
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

          localStorage.removeItem('emailVerified');
          localStorage.setItem('isAnonymous', dataJSON);

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

  }

  const notificationsJSON = localStorage.getItem('notificationsCounts');
  const notificationsData = JSON.parse(notificationsJSON);

  const wishListCountJSON = localStorage.getItem('wishListCount');
  const wishListData = JSON.parse(wishListCountJSON);

  return (
    <>
      <nav id="page-top" className={toggleDrawer ? 'navbar-custom toggled':'navbar-custom'}>
        <div className="navbar-custom__top-div">
          <ul className="d-flex justify-content-end align-items-center">
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="notifications" onClick={() => navigate("/notifications")}>
                <i className="fa-regular fa-bell navbar-custom__icon" />
                {notificationsData?.notificationCount > 0 && (<div className="navbar-custom__data-count">{ notificationsData?.notificationCount }</div>)}
              </button>
            </li>}
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="message" onClick={() => navigate("/chat-room")}>
                <i className="fa-regular fa-message navbar-custom__icon" />
                { notificationsData?.messageCount > 0 && (<div className="navbar-custom__data-count">{ notificationsData?.messageCount }</div>)}
              </button>
            </li>}
            { !isAnonymous && <li>
              <button className="navbar-custom__icon-button" title="wish list" onClick={handleClickWishList}>
                <i className="fa-regular fa-heart navbar-custom__icon" />
                { wishListData?.wishList > 0 && (<div className="navbar-custom__data-count">{ wishListData?.wishList }</div>) }
              </button>
            </li>}
            { !isAnonymous && <li>
              <div className="navbar-custom__user-account-div">
                <button className="navbar-custom__icon-button" title="user account" onClick={() => setShowAccountModal(!showAccountModal)}>
                  <i className="fa-regular fa-user navbar-custom__icon" />
                </button>
                <ul className={ !showAccountModal ? 'pop-over-hidden' : 'navbar-custom__user-account-div__pop-over'}>
                  <li>
                    <button name="my-account" onClick={() => handlePopOverClick("my-account")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-solid fa-user" />
                      <h6>my account</h6>
                    </button>
                  </li>
                  <li>
                    <button name="log-out" onClick={() => handlePopOverClick("log-out")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-sharp fa-solid fa-arrow-right-from-bracket" />
                      <h6>log out</h6>
                    </button>
                  </li>
                </ul>
              </div>
            </li>}
            { isAnonymous && <li>
              <button className="navbar-custom__text-button" onClick={handleShowSignInModal}>
                <h6>Sign In</h6>
              </button>
            </li>}
            { isAnonymous && <li>
              <button className="navbar-custom__text-button" onClick={handleShowRegisterModal}>
                <h6>Register Now</h6>
              </button>
            </li>}
            {/* <li>
              <button className="navbar-custom__icon-button" title="about" onClick={() => navigate("/about")}>
                  <i className="fa-solid fa-info navbar-custom__icon" />
              </button>
            </li> */}
          </ul>
        </div>
        <div className="d-flex justify-content-between navbar-custom__bottom-div align-items-center">
          <Link to="/" className="navbar-custom__brand">
            <span>
              <img className="navbar-custom__app-logo" src={appLogo} alt={appName} />
            </span>
            <span className="h2 navbar-custom__brand-text">
            { appName }
            </span>
          </Link>
          <SellNowButton />
          <DrawerButton
            setToggleDrawer={setToggleDrawer}
            toggleDrawer={toggleDrawer}
            handleShowRegisterModal={handleShowRegisterModal}
            handleShowSignInModal={handleShowSignInModal}
            notificationCount={notificationsData?.notificationCount}
            wishListCount={ wishListData?.wishList }
            messageCount={ notificationsData?.messageCount }
          />
        </div>
      </nav>
      <RegisterModal handleCloseRegisterModal={handleCloseRegisterModal} showRegisterModal={showRegisterModal} handleShowSignInModal={handleShowSignInModal} />
      <SignInModal handleCloseSignInModal={handleCloseSignInModal} showSignInModal={showSignInModal} handleShowRegisterModal={handleShowRegisterModal} setForgotPasswordModal={setShowForgotPasswordModal} />
      <ForgotPasswordModal showModal={showForgotPasswordModal} handleShowSignInModal={handleShowSignInModal} handleCloseForgotPasswordModal={handleCloseForgotPasswordModal}/>
    </>
  );
}

export default Navbar;