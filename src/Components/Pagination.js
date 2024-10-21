import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext';

const Pagination = () => {
    const { page, handlePageChange, totalPages } = useContext(AppContext);
  return (
    <div className="bottom-0 border bg-white w-full flex justify-center items-center py-2 fixed">
      <div className="w-11/12 max-w-[730px] flex justify-between">
        <div className='flex gap-x-3'>
          {page > 1 && (
            <button
              className="py-1 px-4 rounded-sm border-2"
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
          )}

          {page < totalPages && (
            <button
              className="py-1 px-4 rounded-sm border-2"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          )}
        </div>

        <p className="font-bold text-sm">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}

export default Pagination;
