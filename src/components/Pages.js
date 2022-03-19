import React from 'react';
import {Pagination} from 'react-bootstrap';

const Pages = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pages = [];

  for (let number = 1; number <= Math.ceil(totalItems / itemsPerPage); number++) {
    pages.push(
      <Pagination.Item key={number} active={number === currentPage}
                       onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>{pages}</Pagination>
    </div>
  );
};

export default Pages;