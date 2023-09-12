import React from 'react';

export default function PaginationBar({
  setCurrentPage, currentPage, filteredData, itemsPerPage,
}) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <ul className="pagination">
        <li className="page-item pagination__prev-page-item">
          <button
            className="page-link"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
        </li>
        {
            Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) })
              .map((_, index) => (
                <li className="page-item pagination__page-item">
                  <button
                    type="button"
                    className={currentPage === (index + 1) ? 'page-link active' : 'page-link'}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>

                </li>
              ))
           }
        <li className="page-item pagination__next-page-item">
          <button
            className="page-link"
            type="button"
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
