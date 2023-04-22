import React from 'react';

export default function Pagination() {
  return (
    <div className="pagination-div d-flex">
      <div className="pagination d-flex">
        <h6>Prev</h6>
        <div className="pagination__buttons-div d-flex">
          <div className="pagination__button">1</div>
          <div className="pagination__button">2</div>
          <div className="pagination__button">3</div>
          <div>...</div>
          <div className="pagination__button">10</div>
        </div>
        <h6>Next</h6>
      </div>
    </div>
  );
}
