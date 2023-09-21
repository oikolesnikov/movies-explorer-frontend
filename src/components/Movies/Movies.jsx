import React, { useContext, useEffect, useState } from "react";
import "./Movies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from '../../context/app.context';
import Preloader from '../Preloader/Preloader'
import { getMovies } from '../../utils/MoviesApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'

const Movies = () => {
  const context = useContext(AppContext)
  const history = useHistory();

  if (!context.currentUser.token) {
    history.push('/')
  }

  const [filtered, setFiltered] = useState([]);
  const [loadMore, setLoadMore] = useState([]);
  const [counter, setCounter] = useState(0);

  const loadHandler = () => {
    setLoadMore(prev => [...prev, ...filtered.slice(12 + 3 * counter, (12 + 3 * counter) + 3)]);
    setCounter(prev => +prev + 1)
  }


  useEffect(() => {
    const localFiltered = localStorage.getItem('filtered');
    if (localFiltered && typeof localFiltered !== 'undefined') {
      setFiltered(JSON.parse(localFiltered));
    }
  }, [])

  useEffect(() => {
    if (context.error) {
      toast(context.error)
      setTimeout(() => {
        context.setError('')
      }, 5000)
    }
  }, [context.error])


  useEffect(() => {
    (async () => {
      const films = JSON.parse(localStorage.getItem('films'));
      if (films) {
        context.setMovies(films);
      } else {
        await getMovies(context)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (context.searchString && context.movies.length) {
        setFiltered(prev => {
          const movies = [...context.movies.filter(movie => {
            if (movie.nameRU.toLowerCase().indexOf(context.searchString.toLowerCase()) > 0
              || movie.nameEN.toLowerCase().indexOf(context.searchString.toLowerCase()) > 0) {
              if (context.shorts) {
                if (movie.duration <= 40) {
                  return movie
                }
              } else {
                return movie
              }
            }
          })]
          return [...movies]
        })
        setCounter(0);
      }
    })()
  }, [context.searchString, context.shorts]);

  useEffect(() => {
    localStorage.setItem('filtered', JSON.stringify(filtered));
    setLoadMore(filtered.slice(0, 12))
  }, [filtered])

  return (
    <main className="movies">
      <>
        <div className="movies__container">
          <SearchFilm className={"movies__search-film"} />
          {context.searchString
            ? !context.loading ? filtered.length ? <MoviesCardList links={loadMore} /> : <div className='alert'>"Ничего не найдено"</div> : <Preloader /> : <></>}
        </div>
        {(context.searchString
          && filtered.length) && loadMore.length < filtered.length ? <button type="button" className="movies__load-more" onClick={loadHandler}>
          <span className="movies__more-caption">Ещё</span>
        </button> : ''}

      </>
      <ToastContainer />
    </main>
  );
};

export default Movies;
