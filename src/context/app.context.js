import React, { useState, createContext, useEffect } from 'react';
import { SHORT_DURATION } from '../config/constants';
import { getLiked } from '../utils/MainApi';
import { useHistory } from 'react-router-dom'

const initAppContext = {
  loading: false,
  error: '',
  currentUser: {
  },
  searchString: '',
  movies: [],
  filtered: [],
  shorts: false,
  savedShorts: false,
  likedMovies: [],
  filteredLikes: []
}

export const AppContext = createContext(initAppContext);

export const CurrentUserContext = ({ loading = false, error = '', currentUserData = {}, children, search = '', movie = [], shortsFilter = false, liked = [], filtered = [], savedShorts = false, filteredLikes = [] }) => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const localSearch = JSON.parse(localStorage.getItem('search'));
  const checked = JSON.parse(localStorage.getItem('shorts'))
  const localFiltered = JSON.parse(localStorage.getItem('filtered'));
  const localMovies = JSON.parse(localStorage.getItem('films'));
  const [currentUser, setCurrentUser] = useState(user || currentUserData);
  const [loadingStatus, setLoading] = useState(loading);
  const [errorStatus, setError] = useState(error);
  const [searchString, setSearchString] = useState(localSearch || search);
  const [movies, setMovies] = useState(localMovies || movie);
  const [shorts, setShorts] = useState(checked || shortsFilter)
  const [likedMovies, setLikedMovies] = useState(liked)
  const [filteredMovie, setFilteredMovie] = useState(filtered)
  const [savedShortsFlag, setSavedShortsFlag] = useState(savedShorts)
  const [filteredLikesMovies, setFilteredLikesMovies] = useState(likedMovies || filteredLikes)

  const filter = () => {
    if (movies.length) {
      const filtered = movies.filter(movie => {
        if (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) > 0
          || movie.nameEN.toLowerCase().includes(searchString.toLowerCase()) > 0) {
          if (shorts) {
            if (movie.duration <= SHORT_DURATION) {
              return movie
            }
          } else {
            return movie
          }
        }
      })

      if (filtered.length) {
        localStorage.setItem('filtered', JSON.stringify(filtered));
        if (!shorts) {
          localStorage.setItem('shorts', JSON.stringify(shorts))
        }
      }
      setFilteredMovie([...filtered])
    }
  }

  useEffect(() => {
    filter();
  }, [movies, searchString, shorts])

  useEffect(() => {
    if (currentUser.token && !likedMovies.length) {
      getLiked({ currentUser, setLoading, setError })
      .then(res => {
        setLoading(false);

        if (res === 401) {
          localStorage.clear();
          setCurrentUser({});
          return history.push('/')
        } else {
          setLikedMovies([...res])
        }

        return res;
      }).catch(e => {
        console.error(e);
        setLoading(false);
        setError(e.message);
        return e;
      })
    }
  }, [])



  return <AppContext.Provider value={{ loading: loadingStatus, error: errorStatus, currentUser, setCurrentUser, setLoading, setError, searchString, setSearchString, movies, setMovies, shorts, setShorts, likedMovies, setLikedMovies, filtered: filteredMovie, setFilteredMovie, savedShorts: savedShortsFlag, setSavedShortsFlag, filteredLikes: filteredLikesMovies, setFilteredLikes: setFilteredLikesMovies }}>
    {children},
  </AppContext.Provider>;
};
