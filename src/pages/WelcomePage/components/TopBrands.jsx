import React from 'react';
import Samsung from '../../../assets/images/brandLogos/Samsung.png';
import Apple from '../../../assets/images/brandLogos/Apple.png';
import Huawei from '../../../assets/images/brandLogos/Huawei.png';
import Hp from '../../../assets/images/brandLogos/Hp.png';
import Lenovo from '../../../assets/images/brandLogos/Lenovo.png';
import Dell from '../../../assets/images/brandLogos/Dell.png';
import Sony from '../../../assets/images/brandLogos/Sony.png';
import Nokia from '../../../assets/images/brandLogos/Nokia.png';
import Motorola from '../../../assets/images/brandLogos/Motorola.png';
import Asus from '../../../assets/images/brandLogos/Asus.png';
import PlayStation from '../../../assets/images/brandLogos/PlayStation.png';
import Nintendo from '../../../assets/images/brandLogos/Nintendo.png';
import Xbox from '../../../assets/images/brandLogos/Xbox.png';
import Acer from '../../../assets/images/brandLogos/Acer.png';
import Beats from '../../../assets/images/brandLogos/Beats.png';
import Tcl from '../../../assets/images/brandLogos/Tcl.png';
import Jbl from '../../../assets/images/brandLogos/Jbl.png';
import Lg from '../../../assets/images/brandLogos/Lg.png';
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

import TopBrandLink from './TopBrandLink';

export default function TopBrands({ itemType }) {
  const brandsObj = [
    { name: 'Samsung', link: Samsung },
    { name: 'Apple', link: Apple },
    { name: 'Huawei', link: Huawei },
    { name: 'Hp', link: Hp },
    { name: 'Lenovo', link: Lenovo },
    { name: 'Dell', link: Dell },
    { name: 'Sony', link: Sony },
    { name: 'Nokia', link: Nokia },
    { name: 'PlayStation', link: PlayStation },
    { name: 'Jbl', link: Jbl },
    { name: 'Motorola', link: Motorola },
    { name: 'Asus', link: Asus },
    { name: 'Xbox', link: Xbox },
    { name: 'Nintendo', link: Nintendo },
    { name: 'Acer', link: Acer },
    { name: 'Beats', link: Beats },
    { name: 'Tcl', link: Tcl },
    { name: 'Lg', link: Lg },
  ];

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

  if (itemType === 'cars') {
    return (
      <div className="top-brands">
        {
          carBrandObj.map((BrandObj) => (
            <TopBrandLink BrandObj={BrandObj} />
          ))
        }
      </div>
    );
  }

  return (
    <div className="top-brands">
      {
        brandsObj.map((BrandObj) => (
          <TopBrandLink BrandObj={BrandObj} />
        ))
      }
    </div>
  );
}
