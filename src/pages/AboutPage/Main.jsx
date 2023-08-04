import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import AboutImg from '../../assets/images/About.png';
import appName from '../../Constants/constantVariables';

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
          <ContentInfoBox>About Us</ContentInfoBox>
          <div className="about">
            <div className="about__image-div">
              <img src={AboutImg} alt="side" />
            </div>
            <h2 className="about__heading">{`Welcom to ${appName}`}</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              <br />
              Accusantium animi praesentium quaerat rem asperiores excepturi,
              aspernatur, ad officiis, minima recusandae aliquid tenetur!
              <br />
              <br />
              Nemo aperiam.
              Voluptatibus nemo autem tempore debitis
              nisi rerum sed quo neque ea ipsum recusandae provident sint dolor.
              <br />
              <br />
              Odit maiores distinctio fugit animi praesentium quaerat rem asperiores
              dolores deserunt tempor iusto dicta.
            </p>
            <div>
              <h2 className="about__heading">Our Mission</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium animi praesentium quaerat rem asperiores excepturi,
                nemo autem tempore debitis nisi rerum sed quo neque ea ipsum
                odit maiores distinctio fugit dolores deserunt tempora esse,
                inventore minima corporis iusto dicta.
              </p>
            </div>
            <div>
              <h2 className="about__heading">Our Vision</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium animi praesentium quaerat rem asperiores excepturi,
                nemo autem tempore debitis nisi rerum sed quo neque ea ipsum
                odit maiores distinctio fugit dolores deserunt tempora esse,
                inventore minima corporis iusto dicta.
              </p>
            </div>
            <div>
              <h2 className="about__heading">Our Goals</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium animi praesentium quaerat rem asperiores excepturi,
                nemo autem tempore debitis nisi rerum sed quo neque ea ipsum
                odit maiores distinctio fugit dolores deserunt tempora esse,
                inventore minima corporis iusto dicta.
              </p>
            </div>
            <button type="button" className="about__button" onClick={() => navigate('/')}>Go Back To Home</button>
          </div>
        </div>
      </main>
    </div>
  );
}
