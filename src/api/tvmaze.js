// src/api/tvmaze.js

import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

// 1. Arama fonksiyonu
export const searchShows = async (query) => {
  if (!query) return [];
  const response = await axios.get(`${BASE_URL}/search/shows?q=${query}`);
  // TVMaze API'den gelen veriyi (show objesini) temizle
  return response.data.map(item => item.show); 
};

// 2. Detay Sayfası için şovun kendisini çekme
export const fetchShowDetail = async (showId) => {
  const response = await axios.get(`${BASE_URL}/shows/${showId}`);
  return response.data;
};

// 3. Detay Sayfası için şovun bölümlerini çekme
export const fetchShowEpisodes = async (showId) => {
  const response = await axios.get(`${BASE_URL}/shows/${showId}/episodes`);
  return response.data;
};