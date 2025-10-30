// src/components/WatchlistPanel.jsx

import React from 'react';
import { useTV } from '../App';
import { actionTypes } from '../reducer/tvReducer'; // DÜZELTİLDİ: Artık reducer'dan alınıyor

function WatchlistPanel() {
  const { state, dispatch } = useTV();
  const { watchlist } = state;

  const handleRemove = (showId) => {
    dispatch({ 
      type: actionTypes.REMOVE_WATCHLIST, 
      payload: { id: showId } 
    });
  };

  return (
    <div className="watchlist-panel">
      <h2>Gösterime Girecekler ({watchlist.length})</h2>
      
      {watchlist.length === 0 ? (
        <p className="empty-message">Kısa Listeniz boş. TV kartları üzerinden ekleyebilirsiniz.</p>
      ) : (
        <ul className="watchlist-list">
          {watchlist.map(show => (
            <li key={show.id} className="watchlist-item">
              <img src={show.image || 'placeholder.png'} alt={show.name} className="watchlist-image" />
              <div className="item-info">
                <h4>{show.name}</h4>
                <button 
                  onClick={() => handleRemove(show.id)}
                  className="remove-button"
                >
                  Çıkar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchlistPanel;