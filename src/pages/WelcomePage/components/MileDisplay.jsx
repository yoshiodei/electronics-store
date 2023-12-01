import React from 'react';

export default function MileDisplay({ miles }) {
  if (miles > 60) {
    return (<div className="welcome-page__filter-by-distance__caption"><h5>Showing items within 300 miles</h5></div>);
  }

  if (miles < 10) {
    return (<div className="welcome-page__filter-by-distance__caption"><h5>Showing items within a mile</h5></div>);
  }

  return (
    <div className="welcome-page__filter-by-distance__caption">
      <h5>
        Showing items within
        {' '}
        {miles}
        {' '}
        miles
      </h5>
    </div>
  );
}
