import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} entries
      </p>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-gray-200 hover:border-[#196d83] hover:text-[#196d83]"
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          
          // Show first page, last page, current page, and pages around current
          const shouldShow = pageNum === 1 || pageNum === totalPages || 
                           Math.abs(pageNum - currentPage) <= 1;
          
          if (!shouldShow) {
            // Show ellipsis
            if (pageNum === 2 || pageNum === totalPages - 1) {
              return <span key={pageNum} className="px-2 text-gray-400">...</span>;
            }
            return null;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-9 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-[#196d83] text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-[#196d83] hover:text-[#196d83]'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white border-2 border-gray-200 hover:border-[#196d83] hover:text-[#196d83]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
