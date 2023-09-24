import React, { useContext, useEffect, useState } from "react";
import "./Movies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { AppContext } from '../../context/app.context';
import Preloader from '../Preloader/Preloader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'
import { CARDS_COUNTER } from '../../config/constants';

const Movies = () => {
  const context = useContext(AppContext)
  const history = useHistory();

  if (!context.currentUser.token) {
    history.push('/')
  }

  const [loadMore, setLoadMore] = useState([]);
  const [counter, setCounter] = useState(0);

  const loadStart = () => {
    let start = 12;
    let step = 3;
    if (window.innerWidth <= CARDS_COUNTER.hight.px && window.innerWidth >= CARDS_COUNTER.medium.px) {
      start = CARDS_COUNTER.hight.cards;
      step = CARDS_COUNTER.hight.step
    }
    if (window.innerWidth <= CARDS_COUNTER.medium.px && window.innerWidth >= CARDS_COUNTER.small.px) {
      start = CARDS_COUNTER.medium.cards;
      step = CARDS_COUNTER.medium.step
    }
    if (window.innerWidth <= CARDS_COUNTER.small.px) {
      start = CARDS_COUNTER.small.cards;
      step = CARDS_COUNTER.small.step
    }

    let data
    console.log(loadMore.length)

    data = [...context.filtered.slice(0, start)]

    console.log(context.filtered)
    console.log(data)
    console.log(start)
    console.log(step)
    console.log(counter)

    setLoadMore([...data]);
    // setCounter(prev => +prev + 1)
  }

  const loadHandler = () => {
    let start = 12;
    let step = 3;
    if (window.innerWidth <= CARDS_COUNTER.hight.px && window.innerWidth >= CARDS_COUNTER.medium.px) {
      start = CARDS_COUNTER.hight.cards;
      step = CARDS_COUNTER.hight.step
    }
    if (window.innerWidth <= CARDS_COUNTER.medium.px && window.innerWidth >= CARDS_COUNTER.small.px) {
      start = CARDS_COUNTER.medium.cards;
      step = CARDS_COUNTER.medium.step
    }
    if (window.innerWidth <= CARDS_COUNTER.small.px) {
      start = CARDS_COUNTER.small.cards;
      step = CARDS_COUNTER.small.step
    }

    let data
    console.log(loadMore.length)
    if (loadMore.length) {
      data = [...context.filtered.slice(0, (loadMore.length + step))];
    } else {
      data = [...context.filtered.slice(0, start)]
    }
    console.log(context.filtered)
    console.log(data)
    console.log(start)
    console.log(step)
    console.log(counter)

    setLoadMore([...data]);
    // setCounter(prev => +prev + 1)
  }

  // useEffect(() => {
  //   setCounter(0)
  // }, [context.searchString, history.location.pathname])

  useEffect(() => {
    if (context.filtered.length && context.searchString) {
      loadStart();
    }
  }, [context.filtered, context.searchString])


  useEffect(() => {
    if (context.error) {
      toast(context.error)
      setTimeout(() => {
        context.setError('')
      }, 5000)
    }
  }, [context.error])

  return (
    <main className="movies">
      <>
        <div className="movies__container">
          <SearchFilm className={"movies__search-film"} />
          {context.loading && <Preloader />}
          {context.searchString && !loadMore.length && !context.filtered.length && !context.loading ? <div className='alert'>"Ничего не найдено"</div> : ''}
          {context.searchString && loadMore.length ? <MoviesCardList links={loadMore} /> : ''}
        </div>
        {loadMore.length < context.filtered.length
          && <button type="button" className="movies__load-more" onClick={loadHandler}>
            <span className="movies__more-caption">Ещё</span>
          </button>}

      </>
      <ToastContainer />
    </main>
  );
};

export default Movies;
