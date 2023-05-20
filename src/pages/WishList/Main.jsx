/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux';
import ContentInfoBox from '../../components/ContentInfoBox';
import WishListItem from './components/WishListItem';
import AdPanel from '../../components/AdPanel';
import WishListEmpty from './components/WishListEmpty';
import RemoveAllButton from './components/RemoveAllButton';
import { selectWishListState } from '../../redux/slice/wishListSlice';
// import { selectAuthState } from '../../redux/slice/authSlice';

export default function Main() {
  const { wishList } = useSelector(selectWishListState);
  // const { docId } = useSelector(selectAuthState);

  // useEffect(() => {

  // });

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
                <WishListItem item={item} />
              ))}
            {(wishList.length > 1)
             && <RemoveAllButton />}
          </div>
        </div>
      </main>
    </div>
  );
}
