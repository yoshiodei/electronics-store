import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Terms and Conditions</ContentInfoBox>
          <button type="button" className="about__button" onClick={() => navigate('/')}>Go Back To Home</button>
        </div>
      </main>
    </div>
  );
}
