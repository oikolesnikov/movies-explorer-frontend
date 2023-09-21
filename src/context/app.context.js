import React, { useState, createContext } from 'react';

const initAppContext = {
  loading: false,
  error: '',
  currentUser: {
  },
  searchString: '',
  movies: [],
  shorts: false,
  likedMovies: []
}

export const AppContext = createContext(initAppContext);

export const CurrentUserContext = ({ loading = false, error = '', currentUserData = {}, children, search = '', movie = [], shortsFilter = false, liked = [] }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const localSearch = JSON.parse(localStorage.getItem('search'));
  const cheked = JSON.parse(localStorage.getItem('shorts'))
  const [currentUser, setCurrentUser] = useState(user || currentUserData);
  const [loadingStatus, setLoading] = useState(loading);
  const [errorStatus, setError] = useState(error);
  const [searchString, setSearchString] = useState(localSearch || search);
  const [movies, setMovies] = useState(movie);
  const [shorts, setShorts] = useState(cheked || shortsFilter)
  const [likedMovies, setLikedMovies] = useState(liked)


  return <AppContext.Provider value={{ loading: loadingStatus, error: errorStatus, currentUser, setCurrentUser, setLoading, setError, searchString, setSearchString, movies, setMovies, shorts, setShorts, likedMovies, setLikedMovies }}>
    {children},
  </AppContext.Provider>;
};
