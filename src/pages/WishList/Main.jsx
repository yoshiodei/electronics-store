/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentInfoBox from '../../components/ContentInfoBox';
import WishListItem from './components/WishListItem';
import AdPanel from '../../components/AdPanel';
import WishListEmpty from './components/WishListEmpty';
// import RemoveAllButton from './components/RemoveAllButton';
import { getWishList, removeFromWishList, selectWishListState } from '../../redux/slice/wishListSlice';
import { selectAuthState } from '../../redux/slice/authSlice';

export default function Main() {
  const { wishList, isLoading } = useSelector(selectWishListState);
  const { docId } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const removeItem = (itemId) => {
    const listArray = wishList.filter((item) => (
      item.id !== itemId
    ));

    dispatch(removeFromWishList({ listArray, docId }));
  };

  useEffect(() => {
    dispatch(getWishList(docId));
    console.log('dispatch runs');
  }, [dispatch]);

  if (isLoading) {
    return ('loading...');
  }

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>My Wish List</ContentInfoBox>
          <div className="wish-list__item-div">
            {(wishList.length === 0)
             && <WishListEmpty />}
            { (wishList.length > 0)
              && wishList.map((item) => (
                <WishListItem item={item} removeItem={removeItem} />
              ))}
            {/* {(wishList.length > 1)
             && <RemoveAllButton />}  */}
          </div>
        </div>
      </main>
    </div>
  );
}
