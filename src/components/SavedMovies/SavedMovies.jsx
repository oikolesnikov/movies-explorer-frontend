import React, { useContext, useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from '../../context/app.context';
import { getLiked } from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { SHORT_DURATION } from '../../config/constants';

const SavedMovies = () => {
  const context = useContext(AppContext);
  const history = useHistory();

  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState(context.likedMovies)

  if (!context.currentUser.token) {
    history.push('/')
  }

  useEffect(() => {
    getLiked(context)
      .then(res => {
        context.setLoading(false);

        if (res === 401) {
          localStorage.clear();
          context.setCurrentUser({});
          return history.push('/')
        } else {
          context.setLikedMovies([...res])
          setMovies([...res])
        }

        return res;
      }).catch(e => {
        console.error(e);
        context.setLoading(false);
        context.setError(e.message);
        return e;
      })
  }, [])

  useEffect(() => {
    if (!search) {
      setMovies([...context.likedMovies])
    }
    setMovies(prev => {
      return context.likedMovies.filter(movie => {
        if (movie.nameRU.toLowerCase().includes(search.toLowerCase()) > 0
        || movie.nameEN.toLowerCase().includes(search.toLowerCase()) > 0) {
          if (movie.duration <= 40) {
            return movie
          } else {
            return movie
          }
        }
      })
    })
  }, [])
  useEffect(() => {
    if (!search) {
      setMovies([...context.likedMovies])
    }
    setMovies(prev => {
      return context.likedMovies.filter(movie => {
        if (movie.nameRU.toLowerCase().includes(search.toLowerCase()) > 0
        || movie.nameEN.toLowerCase().includes(search.toLowerCase()) > 0) {
          if (movie.duration <= 40) {
            return movie
          } else {
            return movie
          }
        }
      })
    })
  }, [search, context.likedMovies])


  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchFilm setSearch={setSearch} />
        {context.loading && <Preloader />}
        {!context.loading && context.savedShorts
        ? <MoviesCardList links={movies.length ? movies.filter(item => item.duration <= SHORT_DURATION) : movies} />
        : <MoviesCardList links={movies} />}
      </div>
    </main>
  );
};

export default SavedMovies;
