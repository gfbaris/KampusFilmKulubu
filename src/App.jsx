// src/App.jsx - YENİ VE SON HALİ

import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// initialState'ı buraya dahil etmeliyiz
import { tvReducer, initialState, actionTypes } from './reducer/tvReducer'; 
import { searchShows } from './api/tvmaze';

// Page Components
import Home from './pages/Home';       
import ShowDetail from './pages/ShowDetail'; 

// "Tüm Çeşit Filmler" İsteğini Karşılamak İçin Sabitler (API'den geniş veri çekmek için)
const DIVERSE_QUERIES = ['girls', 'buffy', 'power', 'matrix', 'doctor', 'breaking']; // Çeşitli popüler diziler
// Boş arama yapıldığında bu tanımlayıcıyı kullanacağız
const ALL_DEFAULT_QUERY = 'ALL_DEFAULT_DIVERSE_LIST'; 

// Context Setup
const TVContext = createContext(null);
export const useTV = () => useContext(TVContext);

function App() {
  const [state, dispatch] = useReducer(tvReducer, initialState);
  const { searchQuery } = state;

  // Veri Çekme Side-Effect - 3 Durumu Yönetecek Şekilde Güncellendi
  useEffect(() => {
    const fetchData = async () => {
      // 1. Durum: Sorgu yoksa (bu durum sadece hatalı bir state yönetimi olursa gerçekleşmeli)
      if (!searchQuery) {
          dispatch({ type: actionTypes.FETCH_SUCCESS, payload: [] });
          return;
      }
      
      dispatch({ type: actionTypes.FETCH_INIT }); 
      
      try {
        let result = [];
        
        // 2. Durum: Arama kutusu temizlenmişse (ALL_DEFAULT_QUERY tetiklenir)
        if (searchQuery === ALL_DEFAULT_QUERY) {
            // Birden fazla popüler diziyi arama ve sonuçları birleştirme
            const allPromises = DIVERSE_QUERIES.map(q => searchShows(q));
            
            const resultsArray = await Promise.all(allPromises);
            
            // Tek bir diziye birleştir ve tekrar edenleri kaldır (id'ye göre)
            const combinedResults = resultsArray.flat().filter(
                (show, index, self) => index === self.findIndex(s => s.id === show.id)
            );
            result = combinedResults;
            
        } 
        // 3. Durum: Uygulama açılışı (friends) veya Kullanıcının girdiği herhangi bir arama
        else {
            result = await searchShows(searchQuery); 
        }
        
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: result });
      } catch (error) {
        console.error("API Call Error:", error);
        dispatch({ type: actionTypes.FETCH_FAILURE });
      }
    };
    
    // searchQuery değiştiğinde fetch işlemini tetikle
    fetchData(); 
  }, [searchQuery]); 

  // Arama Handler'ı (handleSearch) - SORGULAMA MANTIĞI GÜNCELLENDİ
  const handleSearch = (query) => {
    let finalQuery = query;
    
    // Eğer sorgu boşsa (kullanıcı silip 'Ara' butonuna basmışsa),
    // çoklu arama tanımlayıcısını kullan.
    if (!query || query.trim() === '') {
        finalQuery = ALL_DEFAULT_QUERY; 
    }
    
    // Yeni sorguyu state'e gönder, bu da useEffect'i tetikleyecektir.
    dispatch({ type: actionTypes.SET_QUERY, payload: finalQuery });
  };
  
  return (
    <TVContext.Provider value={{ state, dispatch }}> 
        <Router>
            <Routes>
                {/* handleSearch prop'unu Home bileşenine gönder */}
                <Route path="/" element={<Home handleSearch={handleSearch} />} />
                <Route path="/show/:id" element={<ShowDetail />} />
            </Routes>
        </Router>
    </TVContext.Provider>
  );
}

export default App;