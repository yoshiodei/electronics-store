import React from 'react';
import MileDisplay from './MileDisplay';

export default function FilterByDistance({ miles, setMiles }) {
  // console.log(miles, setMiles);

  return (
    // <div className="welcome-page__filter-by-distance__div">
    //   <MileDisplay miles={miles} />
    //   <div className="welcome-page__filter-by-distance__input-div">
    //     <div className="welcome-page__filter-by-distance__input-range-bar">
    //       <input
    //         type="range"
    //         className="welcome-page__filter-by-distance__thumb"
    //         min="0"
    //         max="70"
    //         step="10"
    //         value={miles}
    //         onChange={(e) => setMiles(e.target.value)}
    //       />
    //       <div className="welcome-page__filter-by-distance__trail-line"
    // style={{ right: `calc(${(100 - ((miles / 70) * 100))}%)` }} />
    //     </div>
    //   </div>
    // </div>
    <div className="welcome-page__filter-by-distance__div">
      <MileDisplay miles={miles} />
      <div className="welcome-page__filter-by-distance__input-div">
        <div className="welcome-page__filter-by-distance__input-range-bar">
          <input
            type="range"
            className="welcome-page__filter-by-distance__thumb"
            min="0"
            max="70"
            step="10"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
          />
          <div
            className="welcome-page__filter-by-distance__trail-line"
            style={{ right: `calc(${(100 - ((miles / 70) * 100))}%)` }}
          />
        </div>
      </div>
    </div>
  );
}
