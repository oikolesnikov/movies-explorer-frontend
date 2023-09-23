import React, { useContext, useState, useRef } from 'react';
import './SearchFilm.css';
import ShortFilmFilter from '../ShortFilmFilter/ShortFilmFilter';
import { AppContext } from '../../context/app.context';
import { getMovies } from '../../utils/MoviesApi';
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const SearchFilm = ({ className = '' }) => {

	const context = useContext(AppContext);
	const location = useLocation();

	const path = location.pathname !== '/saved-movies';

	const ref = useRef();

	const [searchString, setSearchString] = useState(path ? context.searchString : '');

	const searchHandler = async (e) => {
		e.preventDefault()
		try {

			if (path) {
				if (!searchString) {
					ref.current.focus()
					return toast('Нужно ввести ключевое слово');
				}
				context.setSearchString(searchString);
				localStorage.setItem('search', JSON.stringify(searchString))
				const films = JSON.parse(localStorage.getItem('films'));
				if (films) {
					context.setMovies([...films]);
				} else {
					getMovies(context).then(res => context.setMovies([...res]))
				}
			} else {
				if (!searchString) {
					context.setFilteredLikes([...context.likedMovies])
				}
				context.setFilteredLikes(prev => {
					return context.likedMovies.filter(movie => {
						if (movie.nameRU.toLowerCase().includes(searchString.toLowerCase()) > 0
							|| movie.nameEN.toLowerCase().includes(searchString.toLowerCase()) > 0) {
							if (movie.duration <= 40) {
								return movie
							} else {
								return movie
							}
						}
					})
				})
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
				<input type="text" placeholder="Фильм" className="search-film__input" required value={searchString} onChange={(e) => setSearchString(e.target.value)} ref={ref} disabled={context.loading} />

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
			<ShortFilmFilter />
		</section>
	);
};

export default SearchFilm;
