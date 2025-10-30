// src/components/Filters.jsx (Dil filtresi eklendi)

import React from 'react';
import { useTV } from '../App';
import { actionTypes } from '../reducer/tvReducer';

// TVMaze API'den gelen popüler diller
const LANGUAGES = ['English', 'Korean', 'Japanese', 'Spanish', 'French', 'Turkish', 'German'];

function Filters() {
  const { state, dispatch } = useTV();
  const { data, filters } = state;

  // Mevcut listedeki tüm türleri toplama
  const uniqueGenres = [...new Set(data.flatMap(show => show.genres || []))].sort();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({ 
      type: actionTypes.SET_FILTERS, 
      payload: { [name]: value } 
    });
  };

  const handleClearFilters = () => {
    dispatch({ type: actionTypes.CLEAR_FILTERS });
  };

  return (
    <div className="filters-container">
      
      {/* Tür Filtresi */}
      <select name="genre" value={filters.genre} onChange={handleFilterChange}>
        <option value="">-- Tüm Türler --</option>
        {uniqueGenres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      
      {/* YENİ: Dil Filtresi */}
      <select name="language" value={filters.language} onChange={handleFilterChange}>
        <option value="">-- Tüm Diller --</option>
        {LANGUAGES.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Minimum Puan Filtresi */}
      <label htmlFor="minRating">Min Puan:</label>
      <input
        type="number"
        id="minRating"
        name="minRating"
        min="0"
        max="10"
        step="0.5"
        value={filters.minRating}
        onChange={handleFilterChange}
      />
      
      <button onClick={handleClearFilters} className="reset-button">Filtreleri Temizle</button>
    </div>
  );
}

export default Filters;