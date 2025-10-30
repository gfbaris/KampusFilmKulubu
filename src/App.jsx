import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 Router kaldırıldı
import { tvReducer, initialState, actionTypes } from './reducer/tvReducer'; 
import { searchShows } from './api/tvmaze';

// Page Components
import Home from './pages/Home';       
import ShowDetail from './pages/ShowDetail'; 

const DIVERSE_QUERIES = ['girls', 'buffy', 'power', 'matrix', 'doctor', 'breaking'];
const ALL_DEFAULT_QUERY = 'ALL_DEFAULT_DIVERSE_LIST'; 

const TVContext = createContext(null);
export const useTV = () => useContext(TVContext);

function App() {
  const [state, dispatch] = useReducer(tvReducer, initialState);
  const { searchQuery } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
          dispatch({ type: actionTypes.FETCH_SUCCESS, payload: [] });
          return;
      }
      
      dispatch({ type: actionTypes.FETCH_INIT }); 
      
      try {
        let result = [];
        if (searchQuery === ALL_DEFAULT_QUERY) {
            const allPromises = DIVERSE_QUERIES.map(q => searchShows(q));
            const resultsArray = await Promise.all(allPromises);
            const combinedResults = resultsArray.flat().filter(
                (show, index, self) => index === self.findIndex(s => s.id === show.id)
            );
            result = combinedResults;
        } else {
            result = await searchShows(searchQuery); 
        }
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: result });
      } catch (error) {
        console.error("API Call Error:", error);
        dispatch({ type: actionTypes.FETCH_FAILURE });
      }
    };
    
    fetchData(); 
  }, [searchQuery]); 

  const handleSearch = (query) => {
    let finalQuery = query;
    if (!query || query.trim() === '') {
        finalQuery = ALL_DEFAULT_QUERY; 
    }
    dispatch({ type: actionTypes.SET_QUERY, payload: finalQuery });
  };
  
  return (
    <TVContext.Provider value={{ state, dispatch }}> 
      <Routes>
        <Route path="/" element={<Home handleSearch={handleSearch} />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </TVContext.Provider>
  );
}

export default App;
