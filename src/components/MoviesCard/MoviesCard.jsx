import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import savedCardIcon from '../../images/save-button_state_on.svg';
import unsavedCardIcon from '../../images/save-button_state_off.svg';
import deleteCardIcon from '../../images/delete-button.svg';
import './MoviesCard.css';
import { AppContext } from '../../context/app.context';
import { addLike, deleteLiked } from '../../utils/MainApi';

const MoviesCard = (movie) => {

	let { pathname } = useLocation();
	const [like, setLike] = useState(pathname !== '/movies');
	const context = useContext(AppContext);
	const isSelected = false;
	const сardIconSaveState = isSelected ? savedCardIcon : unsavedCardIcon;
	const cardIconState = pathname === '/movies' ? сardIconSaveState : deleteCardIcon;

	const likeHandler = async (e) => {
		if (!like) {
			await addLike(movie, context);
		} else {
			await deleteLiked(movie.movieId, context);
		}
		setLike(prev => !prev)
	}

	useEffect(() => {
		return () => {
			pathname = null;
		}
	}, [])

	// заголовок уже второго уровня
	return (
		<li key={movie.id} className="movies-card" >
			<img src={pathname === '/movies' ? "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url : movie.image}
				alt={`${movie.nameRU}_${movie.id}`} className="movies-card__img" />
			<a href={movie.trailerLink} target='_blank' className="movies-card__description-wrapper">
				<h2 className="movies-card__title">{movie.nameRU}</h2>
				<span className="movies-card__duration">{Math.round(movie.duration / 60)}ч {Math.round(movie.duration - movie.duration / 60)}м</span>
			</a>
			<span className="movies-card__icon" onClick={(e) => likeHandler(e)}>
				<img

					width={12}
					height={12}
					src={like ? deleteCardIcon : cardIconState}
					alt={'Удалить фильм'}
				/>
			</span>
		</li>
	);
};

export default MoviesCard;
