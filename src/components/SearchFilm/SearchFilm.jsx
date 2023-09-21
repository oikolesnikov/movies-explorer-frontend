import React, { useContext, useState } from 'react';
import './SearchFilm.css';
import ShortFilmFilter from '../ShortFilmFilter/ShortFilmFilter';
import { AppContext } from '../../context/app.context';

const SearchFilm = ({ className = '' }) => {

	const context = useContext(AppContext);

	const [searchString, setSearchString] = useState(context.searchString);

	const searchHandler = async (e) => {
		e.preventDefault()
		try {
			context.setSearchString(searchString);
			localStorage.setItem('search', JSON.stringify(searchString))
		} catch (e) {
			context.setLoading(false);
			context.setError(e.message);
			console.error(e);
		}
	}

	return (
		<section className={`search-film search-film_position ${className} container`}>
			<form className="search-film__form" onSubmit={e => searchHandler(e)}>
				<input type="text" placeholder="Фильм" className="search-film__input" required value={searchString} onChange={(e) => setSearchString(e.target.value)}/>

				<button type="submit" className="search-film__button">
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
