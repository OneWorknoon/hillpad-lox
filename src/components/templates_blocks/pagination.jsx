import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        style={{ fontWeight: currentPage === i ? 'bold' : 'normal' }}
      >
        {i}
      </button>
    );
  }

  return <div>{pages}</div>;
};

export default Pagination