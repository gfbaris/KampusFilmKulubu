// src/reducer/tvReducer.js

export const actionTypes = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_PAGE: 'SET_PAGE',
};

export const initialState = {
  // KRİTİK: Uygulama açılışında arama kutusunda ve API sorgusunda "friends" yazar
  searchQuery: 'friends', 
  data: [],
  watchlist: [],
  isLoading: false,
  isError: false,
  filters: {
    genre: '',
    language: '',
    minRating: 0,
  },
  currentPage: 1,
  pageSize: 6, // Sayfada 6 film gösterimi
};

export function tvReducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_INIT:
      return { ...state, isLoading: true, isError: false, currentPage: 1 };
    
    case actionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload };

    case actionTypes.FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, data: [] };

    case actionTypes.SET_QUERY:
      // Yeni arama yapıldığında sayfayı 1'e sıfırla
      return { ...state, searchQuery: action.payload, currentPage: 1 };

    case actionTypes.SET_FILTERS:
      // Filtreler değiştiğinde sayfayı 1'e sıfırla
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
      
    case actionTypes.CLEAR_FILTERS:
      // Filtreleri temizlerken sayfayı 1'e sıfırla
      return { ...state, filters: initialState.filters, currentPage: 1 };

    case actionTypes.ADD_WATCHLIST:
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state; // Zaten varsa ekleme
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case actionTypes.REMOVE_WATCHLIST:
      return { ...state, watchlist: state.watchlist.filter(item => item.id !== action.payload.id) };
      
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
}