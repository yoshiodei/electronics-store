import React from 'react';
import AdPanel from '../../components/AdPanel';
import ChatWall from './components/ChatWall';
import ChatList from './components/ChatList';

export default function Main({ uid }) {
  // const dispatch = useDispatch();
  // const initialState = {
  //   isLoading: false,
  //   recipientId: '',
  //   recipientImage: '',
  //   recipientName: '',
  //   error: null,
  // };

  // useEffect(
  //   () => () => {
  //     dispatch(SET_RECIPIENT_CHAT_DETAILS(initialState));
  //   },
  //   [],
  // );

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ChatList uid={uid} />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ChatWall uid={uid} />
          <div className="main-section__mobile-div">
            <br />
            <ChatList uid={uid} />
          </div>
        </div>
      </main>
    </div>
  );
}
