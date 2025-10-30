// src/components/Pagination.jsx (TAM VE DÜZELTİLMİŞ)

import React, { useMemo } from 'react';
import { useTV } from '../App';
import { actionTypes } from '../reducer/tvReducer';

function Pagination() {
  const { state, dispatch } = useTV();
  const { data, currentPage, pageSize, filters } = state;

  // Filtreler zaten TVList'te uygulandığı için, burada sadece data'nın uzunluğunu kullanıyoruz
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: actionTypes.SET_PAGE, payload: page });
    }
  };

  if (totalPages <= 1) {
    return null;
  }
  
  // Kutucuklu sayfa numaraları için dizi oluşturma
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className="pagination-container">
      {/* Önceki Butonu */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Önceki
      </button>

      {/* Sayfa Numarası Kutucukları */}
      <div className="page-numbers-group">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination-button page-number-button ${number === currentPage ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Sonraki Butonu */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Sonraki
      </button>

      <span className="page-info">
        Sayfa <b>{currentPage}</b> / {totalPages}
      </span>
    </div>
  );
}

export default Pagination;