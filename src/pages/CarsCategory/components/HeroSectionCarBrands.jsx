import React from 'react';
import Toyota from '../../../assets/images/brandLogos/carBrands/toyota.png';
import Ford from '../../../assets/images/brandLogos/carBrands/ford.png';
import Benz from '../../../assets/images/brandLogos/carBrands/benz.png';
import BMW from '../../../assets/images/brandLogos/carBrands/BMW.webp';
import Kia from '../../../assets/images/brandLogos/carBrands/kia.png';
import Honda from '../../../assets/images/brandLogos/carBrands/honda.png';
import VW from '../../../assets/images/brandLogos/carBrands/VW.png';
import Hyundai from '../../../assets/images/brandLogos/carBrands/hyundai.webp';
import Lexus from '../../../assets/images/brandLogos/carBrands/lexus.png';
import Jeep from '../../../assets/images/brandLogos/carBrands/jeep.png';
import Nissan from '../../../assets/images/brandLogos/carBrands/nissan.png';
import Audi from '../../../assets/images/brandLogos/carBrands/audi.png';
import Mitsubishi from '../../../assets/images/brandLogos/carBrands/mitsubishi.png';
import Citroen from '../../../assets/images/brandLogos/carBrands/citroen.png';
import Cadillac from '../../../assets/images/brandLogos/carBrands/cadillac.png';
import Chevrolet from '../../../assets/images/brandLogos/carBrands/chevrolet.webp';
import Mazda from '../../../assets/images/brandLogos/carBrands/mazda.png';
import Tata from '../../../assets/images/brandLogos/carBrands/tata.png';
import LandRover from '../../../assets/images/brandLogos/carBrands/land-rover.png';
import AlphaRomeo from '../../../assets/images/brandLogos/carBrands/alpha-romeo.png';
import Peugeot from '../../../assets/images/brandLogos/carBrands/peugeot.png';
import Skoda from '../../../assets/images/brandLogos/carBrands/skoda.png';
import BrandLink from '../../SearchResult/components/BrandLink';

export default function HeroSectionCarBrands() {
  const carBrandObj = [
    { name: 'Toyota', link: Toyota },
    { name: 'Ford', link: Ford },
    { name: 'Benz', link: Benz },
    { name: 'BMW', link: BMW },
    { name: 'Kia', link: Kia },
    { name: 'Hyundai', link: Hyundai },
    { name: 'VW', link: VW },
    { name: 'Honda', link: Honda },
    { name: 'Lexus', link: Lexus },
    { name: 'Jeep', link: Jeep },
    { name: 'Nissan', link: Nissan },
    { name: 'Audi', link: Audi },
    { name: 'Mitsubishi', link: Mitsubishi },
    { name: 'Citroen', link: Citroen },
    { name: 'Cadillac', link: Cadillac },
    { name: 'Chevrolet', link: Chevrolet },
    { name: 'Mazda', link: Mazda },
    { name: 'Tata', link: Tata },
    { name: 'Land Rover', link: LandRover },
    { name: 'Alpha Romeo', link: AlphaRomeo },
    { name: 'Peugeot', link: Peugeot },
    { name: 'Skoda', link: Skoda },
  ];

  return (
    <div className="hero-section-brands__div">
      <div className="hero-section-brands">
        {
          carBrandObj.map((BrandObj) => (
            <BrandLink BrandObj={BrandObj} />
          ))
        }
      </div>
    </div>
  );
}
