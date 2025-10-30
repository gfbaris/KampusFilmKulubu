// src/components/Header.jsx - MUHTEMEL EKSİK PARÇA

import React from 'react';
import SearchBox from './SearchBox';
import Filters from './Filters'; // Diğer bileşenler

function Header({ onSearch }) {
  return (
    <header className="fixed-header">
      <div className="header-top-row">
        <h1 className="logo-text">Kampüs Film Kulübü</h1>
        <nav className="header-nav">
          <a href="/" className="nav-link">Anasayfa</a>
          {/* Ekstra linkler buraya eklenebilir */}
        </nav>
      </div>
      <div className="search-filter-row">
        {/* KRİTİK: onSearch prop'unu SearchBox'a iletiyor */}
        <SearchBox onSearch={onSearch} /> 
        <Filters />
      </div>
    </header>
  );
}

export default Header;