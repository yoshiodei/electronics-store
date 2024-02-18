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
import BrandLink from './BrandLink';

export default function HeroSectionBrands() {
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

  return (
    <div className="hero-section-brands__div">
      <div className="hero-section-brands">
        {
        brandsObj.map((BrandObj) => (
          <BrandLink BrandObj={BrandObj} />
        ))
      }
      </div>
    </div>
  );
}
