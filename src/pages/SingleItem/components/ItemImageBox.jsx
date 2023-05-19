import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import StartChatButton from './StartChatButton';
import { selectAuthState } from '../../../redux/slice/authSlice';
import Carousel from './Carousel';
import dummyImage from '../../../assets/images/dummy-image.jpg';
import ItemImageBoxLoading from './ItemImageBoxLoading';

export default function ItemImageBox() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { isLoggedIn } = useSelector(selectAuthState);

  const fetchData = () => {
    const docRef = doc(db, 'products', id);
    getDoc(docRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const data = itemDoc.data();
          console.log('product in details ==>', data);
          setProduct(data);
        }
      })
      .catch(
        (err) => {
          console.log('No such document!', err.message);
        },
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!product.image) {
    return (<ItemImageBoxLoading />);
  }

  return (
    <div className="item-image-box">
      <div className="item-image-box__top-div">
        <Carousel image={product.image} />
        {isLoggedIn && <StartChatButton />}
      </div>
      <div className="item-image-box__bottom-div">
        <div className="item-image-box__bottom-div__image-div active" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1">
          <img src={product.image} alt="product" />
        </div>
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2">
          <img src={dummyImage} alt="product" />
        </div>
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3">
          <img src={dummyImage} alt="product" />
        </div>
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4">
          <img src={dummyImage} alt="product" />
        </div>
        <div className="item-image-box__bottom-div__image-div" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5">
          <img src={dummyImage} alt="product" />
        </div>
      </div>
    </div>
  );
}
