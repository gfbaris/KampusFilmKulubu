// src/components/TVList.jsx (Dil filtresi eklendi)

import React from 'react';
import { useTV } from '../App';
import TVCard from './TVCard';

function TVList() {
  const { state } = useTV();
  const { data = [], filters, currentPage, pageSize, isLoading } = state; 
  
  // 1. Filtreleme Mantığı
  const filteredShows = data.filter(show => {
    
    // Tür Filtresi
    if (filters.genre && !show.genres?.includes(filters.genre)) {
      return false;
    }
    
    // YENİ: Dil Filtresi
    if (filters.language && show.language !== filters.language) {
        return false;
    }
    
    // Puan Filtresi
    const minRating = parseFloat(filters.minRating);
    if (minRating > 0 && (show.rating?.average || 0) < minRating) {
      return false;
    }
    
    return true;
  });

  // 2. Sayfalandırma Mantığı
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedShows = filteredShows.slice(startIndex, endIndex);

  // Filtreleme sonucu boşsa
  if (!isLoading && filteredShows.length === 0) {
    return <p className="no-results">Aradığınız kriterlere uygun dizi bulunamadı.</p>;
  }

  return (
    <div className="tv-list-grid">
      {paginatedShows.map(show => (
        <TVCard key={show.id} show={show} /> 
      ))}
    </div>
  );
}

export default TVList;