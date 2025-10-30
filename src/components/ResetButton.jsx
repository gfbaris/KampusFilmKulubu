// src/components/ResetButton.jsx

import React from 'react';
// 1. useTV hook'unu Context'i sağlayan App.jsx'ten alıyoruz.
import { useTV } from '../App'; 
// 2. actionTypes objesini ise state yönetiminin tanımlandığı reducer dosyasından alıyoruz.
import { actionTypes } from '../reducer/tvReducer'; 

function ResetButton() {
  const { dispatch } = useTV();

  const handleReset = () => {
    // CLEAR_FILTERS aksiyonunu göndererek tüm filtreleri sıfırla
    dispatch({ type: actionTypes.CLEAR_FILTERS });
    
    // Opsiyonel: Arama sorgusunu da başlangıç değerine (varsayılan: 'friends') sıfırla
    dispatch({ type: actionTypes.SET_QUERY, payload: 'friends' });
  };

  return (
    <button onClick={handleReset} className="reset-button">
      Filtreleri Sıfırla
    </button>
  );
}

export default ResetButton;