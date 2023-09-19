import React from 'react';
import './SearchFilm.css';
import ShortFilmFilter from '../ShortFilmFilter/ShortFilmFilter';

const SearchFilm = ({ className = '' }) => {
	return (
		<section className={`search-film search-film_position ${className} container`}>
			<form className="search-film__form">
				<input type="text" placeholder="Фильм" className="search-film__input" required />

				<button type="button" className="search-film__button">
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
