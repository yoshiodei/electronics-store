import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import AdPanel from '../../components/AdPanel';
// import ContentInfoBox from '../../components/ContentInfoBox';
import SupportandFAQs from './components/SupportandFAQs';
import { analytics } from '../../config/firebaseConfig';

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, []);

  useEffect(() => {
    logEvent(analytics, 'select_content', {
      content_type: 'image',
      content_id: 'P12453',
    });
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          {/* <ContentInfoBox>Support Page</ContentInfoBox> */}
          <SupportandFAQs />
          <button type="button" className="about__button" onClick={() => { window.scrollTo(0, 0); navigate('/'); }}>Go Back To Home</button>
        </div>
      </main>
    </div>
  );
}
