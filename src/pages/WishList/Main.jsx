/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentInfoBox from '../../components/ContentInfoBox';
import WishListItem from './components/WishListItem';
import AdPanel from '../../components/AdPanel';
import WishListEmpty from './components/WishListEmpty';
import { getWishList, removeFromWishList, selectWishListState } from '../../redux/slice/wishListSlice';
import Loader from '../../components/Loader';

export default function Main({ uid }) {
  const { wishList, isLoading } = useSelector(selectWishListState);
  const dispatch = useDispatch();

  const removeItem = (itemId) => {
    const listArray = wishList.filter((item) => (
      item.id !== itemId
    ));

    dispatch(removeFromWishList({ listArray, uid }));
  };

  useEffect(() => {
    dispatch(getWishList(uid));
  }, [dispatch]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>My Wish List</ContentInfoBox>
          {isLoading && (<Loader />)}
          {!isLoading && (
          <div className="wish-list__item-div">
              {(wishList.length === 0)
             && <WishListEmpty />}
              { (wishList.length > 0)
              && wishList.map((item) => (
                <WishListItem item={item} removeItem={removeItem} />
              ))}
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
