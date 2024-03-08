import React from 'react'
import { useState } from 'react';

const PAGE_SIZE = 10;
const index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const getTotalPages = () => {
        return 10; // hardcoded for simplicity sake. In a real-world scenario, this should be calculated based on the total number of items
        // return Math.ceil((window.__INITIAL_DATA__ as any).total / PAGE_SIZE);
    }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
       {/* Pagination */}
<div className='flex justify-center mt-4'>
  {currentPage > 1 && (
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className='mx-2 rounded-1xl bg-gray-300'
    >
      &lt; Prev
    </button>
  )}

  {currentPage > 2 && (
    <button
      onClick={() => handlePageChange(1)}
      className={`mx-2 rounded-1xl bg-gray-300`}
    >
      1
    </button>
  )}

  {currentPage > 3 && (
    <span className='mx-2 text-lg'>...</span>
  )}

  {Array.from({ length: Math.min(3, getTotalPages()) }).map((_, index) => {
    const page = currentPage - 1 + index;
    return (
      page>0 && page <= getTotalPages() && (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`mx-2 rounded-1xl ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          {page}
        </button>
      )
    );
  })}

  {currentPage + 3 < getTotalPages() && (
    <span className='mx-2 text-lg'>...</span>
  )}

  {currentPage + 3 <= getTotalPages() && (
    <button
      onClick={() => handlePageChange(getTotalPages())}
      className={`mx-2 rounded-1xl ${
        currentPage === getTotalPages() ? 'bg-blue-500 text-white' : 'bg-gray-300'
      }`}
    >
      {getTotalPages()}
    </button>
  )}

  {currentPage < getTotalPages() && (
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className='mx-2 rounded-1xl bg-gray-300'
    >
      Next &gt;
    </button>
  )}
</div>
    </div>
  )
}

export default index
