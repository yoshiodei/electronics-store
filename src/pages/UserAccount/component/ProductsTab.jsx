import React from 'react';
import AllItemsTab from './AllItemsTab';
import ActiveItemsTab from './ActiveItemsTab';
import SoldItemsTab from './SoldItemsTab';

export default function ProductsTab() {
  return (
    <>
      <ul className="nav nav-tabs tabs-custom" id="myTab" role="tablist">
        <li className="nav-item tabs-custom__tab-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Items</button>
        </li>
        <li className="nav-item tabs-custom__tab-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Items In Stock</button>
        </li>
        <li className="nav-item tabs-custom__tab-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Sold Items</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <AllItemsTab />
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <ActiveItemsTab />
        </div>
        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
          <SoldItemsTab />
        </div>
      </div>

    </>

  );
}
