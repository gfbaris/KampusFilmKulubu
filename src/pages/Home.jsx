// src/pages/Home.jsx

import React from 'react';
// Varsayılan importlarınız
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import WatchlistPanel from '../components/WatchlistPanel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TVList from '../components/TVList';
// useTV App'den gelir
import { useTV } from '../App'; 

function Home({ handleSearch }) {
  const { state } = useTV();
  const { data, isLoading, isError } = state;

  return (
    <div className="app-container">
      {/* handleSearch prop'u Header içindeki SearchBox'a iletilir */}
      <Header onSearch={handleSearch} /> 
      
      <div className="main-content">
        <main className="tv-list-area">
          {/* Yükleme ve Hata Durumu Gösterimi */}
          {isError && <p className="error">Hata: Veri yüklenirken bir sorun oluştu.</p>}
          {isLoading && <p className="loading">Yükleniyor...</p>}
          
          <TVList />
          
          <Pagination /> 
          
        </main>
        
        <aside className="watchlist-area">
          <WatchlistPanel />
        </aside>
      </div>
      
      <Footer isim="Barış Saylık" />
    </div>
  );
}

export default Home;