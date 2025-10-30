// src/pages/ShowDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate eklendi
import { fetchShowDetail, fetchShowEpisodes } from '../api/tvmaze';

function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Yönlendirme için
  
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const detailResult = await fetchShowDetail(id);
        const episodesResult = await fetchShowEpisodes(id);
        
        setShow(detailResult);
        setEpisodes(episodesResult);
        setLoading(false);
      } catch (err) {
        console.error("Detay verisi yüklenirken hata:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);
  
  // HTML etiketlerini temizleme
  const sanitizeHTML = (html) => {
    return html?.replace(/<[^>]+>/g, '') || 'Özet mevcut değil.';
  }

  if (loading) return <div className="detail-loading">Detaylar Yükleniyor...</div>;
  if (error || !show) return <div className="detail-error">Üzgünüz, dizi detayları bulunamadı.</div>;

  // Bölümleri sezona göre gruplama
  const groupedEpisodes = episodes.reduce((acc, episode) => {
    const season = `Sezon ${episode.season}`;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {});

  return (
    <div className="show-detail-container">
      {/* İSTENEN: Anasayfaya Dön Butonu */}
      <button 
          onClick={() => navigate('/')} 
          className="back-to-home-button" 
          title="Anasayfaya Dön"
      >
          &larr; Anasayfaya Geri Dön
      </button>

      <div className="detail-header">
        <img src={show.image?.original || 'placeholder.png'} alt={show.name} className="detail-poster" />
        <div className="detail-info">
          <h1>{show.name}</h1>
          <div className="detail-badges">
            <span className="badge rating-badge">{show.rating?.average || 'N/A'} Puan</span>
            {show.genres?.map(genre => <span key={genre} className="badge genre-badge">{genre}</span>)}
          </div>
          <p className="detail-summary">{sanitizeHTML(show.summary)}</p>
          
          <div className="detail-meta">
            <p><strong>Dil:</strong> {show.language}</p>
            <p><strong>Çıkış:</strong> {show.premiered?.substring(0, 4)}</p>
            {/* İSTENEN: Kaynak Butonu */}
            <a href={show.url} target="_blank" rel="noopener noreferrer" className="source-button">
              Kaynak (TVMaze)
            </a>
          </div>
        </div>
      </div>

      <div className="episodes-section">
        <h2>Sezonlar ve Bölümler</h2>
        {Object.entries(groupedEpisodes).map(([seasonName, episodes]) => (
          <div key={seasonName} className="season-block">
            <h3>{seasonName} ({episodes.length} Bölüm)</h3>
            <ul className="episode-list">
              {episodes.map(ep => (
                <li key={ep.id} className="episode-item">
                  <span className="ep-number">S{ep.season}E{ep.number}</span>
                  <span className="ep-name">{ep.name}</span>
                  <span className="ep-airdate">{ep.airdate}</span>
                  <span className="ep-runtime">{ep.runtime} dk</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetail;