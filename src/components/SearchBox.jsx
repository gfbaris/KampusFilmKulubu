// src/components/SearchBox.jsx

import React, { useState, useEffect } from 'react';
import { useTV } from '../App'; // searchQuery değerini okumak için

function SearchBox({ onSearch }) {
  const { state } = useTV();
  const [query, setQuery] = useState(state.searchQuery === 'ALL_DEFAULT_DIVERSE_LIST' ? '' : state.searchQuery); 

  // KRİTİK: Uygulama ilk açıldığında veya friends/boş durumuna dönüldüğünde input'u güncellemek için
  useEffect(() => {
    // Eğer searchQuery, App.jsx'teki özel "tüm filmler" tanımlayıcısı ise, input'ta boş görünsün.
    if (state.searchQuery === 'ALL_DEFAULT_DIVERSE_LIST') {
        setQuery('');
    } else {
        setQuery(state.searchQuery);
    }
  }, [state.searchQuery]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Boş sorguyu App'e ilet. App, bunu 'ALL_DEFAULT_DIVERSE_LIST' olarak işleyecek.
    onSearch(query); 
  };
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        placeholder="Dizi ara..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Ara</button>
    </form>
  );
}

export default SearchBox;