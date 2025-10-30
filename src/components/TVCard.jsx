// src/components/TVCard.jsx

import React from 'react';
import { useTV } from '../App';
import { actionTypes } from '../reducer/tvReducer'; 
import { useNavigate } from 'react-router-dom'; 

function TVCard({ show }) {
  const { state, dispatch } = useTV(); 
  const navigate = useNavigate(); 
  
  const inWatchlist = state.watchlist.some(item => item.id === show.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      // Gösterimden Çıkar
      dispatch({ 
        type: actionTypes.REMOVE_WATCHLIST, 
        payload: { id: show.id } 
      });
    } else {
      // Gösterime Ekle (Minimal veri ile ekle)
      dispatch({ 
        type: actionTypes.ADD_WATCHLIST, 
        payload: { 
          id: show.id, 
          name: show.name, 
          image: show.image?.medium || 'placeholder.png' 
        }
      });
    }
  };
  
  // Özet metnini temizleme ve kısaltma
  const sanitizeAndTruncateSummary = (summary, maxLength = 100) => {
    const cleanText = summary?.replace(/<[^>]+>/g, '') || 'Kısa özet mevcut değil.';
    return cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;
  }
  
  // Detay sayfasına yönlendirme
  const handleDetailClick = () => {
      navigate(`/show/${show.id}`);
  };

  return (
    <div className="tv-card">
      <img src={show.image?.medium || 'placeholder.png'} alt={show.name} />
      
      <h3>{show.name}</h3>
      
      <div className="metadata-badges">
        <span className="badge rating-badge">{show.rating?.average || 'N/A'}</span>
        {show.genres?.slice(0, 2).map(genre => (
            <span key={genre} className="badge genre-badge">{genre}</span>
        ))}
        {show.language && <span className="badge lang-badge">{show.language}</span>}
      </div>
      
      <p className="summary-text">{sanitizeAndTruncateSummary(show.summary)}</p>

      <div className="card-actions">
        <button onClick={handleDetailClick} className="detail-button">
          Detay
        </button>
        <button 
          onClick={handleWatchlistToggle} 
          className={inWatchlist ? 'remove' : 'add'}
        >
          {inWatchlist ? 'Gösterimden Çıkar' : 'Gösterime Ekle'}
        </button>
      </div>
    </div>
  );
}

export default TVCard;