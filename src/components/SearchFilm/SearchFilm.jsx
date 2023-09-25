import React, { useContext, useState, useRef } from 'react';
import './SearchFilm.css';
import ShortFilmFilter from '../ShortFilmFilter/ShortFilmFilter';
import { AppContext } from '../../context/app.context';
import { getMovies } from '../../utils/MoviesApi';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const SearchFilm = ({ className = '', setSearch }) => {

	const context = useContext(AppContext);
	const location = useLocation();

	const path = location.pathname !== '/saved-movies';

	const ref = useRef();

	const [searchString, setSearchString] = useState(path ? context.searchString : '');
	const [error, setError] = useState(false)

	const searchHandler = async (e) => {
		e.preventDefault()
		try {

			if (path) {
				if (!searchString) {
					ref.current.focus()
					setError(true)
					return;
				} else {
					setError(false)
				}
				context.setSearchString(searchString);
				localStorage.setItem('search', JSON.stringify(searchString))
				const films = JSON.parse(localStorage.getItem('films'));
				if (films) {
					context.setMovies([...films]);
				} else {
					getMovies(context)
						.then(res => {

							context.setMovies([...res]);
							context.setLoading(false);
							localStorage.setItem('films', JSON.stringify(res))
							context.setLoading(false);

							return res;
						})
						.catch(e => {
							context.setLoading(false);
							context.setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
							console.error(e);
						})
				}
			} else {
				setSearch(searchString)
			}
		} catch (e) {
			context.setLoading(false);
			context.setError(e.message);
			console.error(e);
		}
	}

	if (location === '/saved-movies') {

	}

	return (
		<section className={`search-film search-film_position ${className} container`}>
			<form className="search-film__form">
				<input type="text" placeholder="Фильм" className="search-film__input" required value={searchString} onChange={(e) => setSearchString(e.target.value)} ref={ref} disabled={context.loading}/>
				<button onClick={e => searchHandler(e)} className="search-film__button" disabled={context.loading}>
					<svg width="7" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1 13l5-6-5-6"
							stroke="#fff"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</form>
				<span className={`auth-form__error-message ${error ? 'show' : ''}`}>Нужно ввести ключевое слово</span>
			<ShortFilmFilter />
		</section>
	);
};

export default SearchFilm;
