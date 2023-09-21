import React, { useContext, useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from '../../context/app.context';
import { getLiked } from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const SavedMovies = () => {
  const context = useContext(AppContext);

  const [filtered, setFiltered] = useState(context.likedMovies);

  const history = useHistory();

  if (!context.currentUser.token) {
    history.push('/')
  }

  const filter = () => {
    if (context.shorts) {
      return
    } else {
      return filtered;
    }
  }

  useEffect(() => {
    (async () => {
      await getLiked(context).then(res => setFiltered(res));
    })()
  }, [])

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchFilm />
        {context.loading && <Preloader/>}
        {!context.loading  && context.shorts ? <MoviesCardList links={filtered.filter(item => item.duration <= 40)} /> : <MoviesCardList links={filtered} />}
      </div>
    </main>
  );
};

export default SavedMovies;
