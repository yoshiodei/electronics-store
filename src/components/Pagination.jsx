import React, { useState } from 'react';

export default function Pagination({ products }) {
  const [pagesArray, setPagesArray] = useState([]);
  // const handleChangePage = (page) => {
  //   setPage(page);
  // };

  // const handlePrev = () => {
  //   setPage(--page);
  //   console.log(page);
  // };

  // const handleNext = () => {
  //   setPage(++page);
  // };

  // useEffect(() => {
  const numberOfPages = Math.ceil((products.length / 20));
  for (let i = 1; i <= numberOfPages; i += 1) {
    setPagesArray([...pagesArray, i.toString()]);
  }
  // }, []);

  return (
    <div className="pagination-div d-flex">
      <div className="pagination d-flex">
        <h6>Prev</h6>
        <div className="pagination__buttons-div d-flex">
          {pagesArray.map((page) => (
            <div className="pagination__button">{page}</div>
          ))}
        </div>
        <h6>Next</h6>
      </div>
    </div>
  );
}
