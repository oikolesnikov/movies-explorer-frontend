import React, { useContext, useEffect } from "react";
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
      }

      return res;
    }).catch(e => {
      console.error(e);
      context.setLoading(false);
      context.setError(e.message);
      return e;
    })
  }, [])

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchFilm />
        {context.loading && <Preloader />}
        {!context.loading && context.savedShorts ? <MoviesCardList links={context.filteredLikes.length ? context.filteredLikes.filter(item => item.duration <= SHORT_DURATION) : context.likedMovies.filter(item => item.duration <= SHORT_DURATION)} /> : <MoviesCardList links={context.filteredLikes.length ? context.filteredLikes : context.likedMovies} />}
      </div>
    </main>
  );
};

export default SavedMovies;
