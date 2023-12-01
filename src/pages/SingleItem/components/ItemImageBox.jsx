import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../config/firebaseConfig';
import StartChatButton from './StartChatButton';
import { selectAuthState } from '../../../redux/slice/authSlice';
import Carousel from './Carousel';
// import dummyImage from '../../../assets/images/dummy-image.jpg';
import ItemImageBoxLoading from './ItemImageBoxLoading';
import AddItemToWishlistButton from './AddItemToWishlistButton';

export default function ItemImageBox() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;

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
  }, [id]);

  if (!product?.name) {
    return (<ItemImageBoxLoading />);
  }

  return (
    <div className="item-image-box">
      <div className="item-image-box__top-div">
        <Carousel images={product?.images} />
        {(uid !== product?.vendor?.uid)
        && (
        <AddItemToWishlistButton
          vendor={product?.vendor}
          uid={uid}
          id={id}
        />
        )}
        {(uid !== product?.vendor?.uid) && <StartChatButton recipientData={product} />}
      </div>
      <div className="item-image-box__bottom-div">
        {
              product.images.map((itemImage, index) => (
                <div
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  aria-current="true"
                  aria-label={`Slide ${index + 1}`}
                  className={index === 0 ? 'item-image-box__bottom-div__image-div active' : 'item-image-box__bottom-div__image-div'}
                >
                  <img src={itemImage} alt="product" />
                </div>
              ))
            }
      </div>
    </div>
  );
}
