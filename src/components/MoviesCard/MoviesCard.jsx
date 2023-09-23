import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import savedCardIcon from '../../images/save-button_state_on.svg';
import deleteCardIcon from '../../images/delete-button.svg';
import './MoviesCard.css';
import { AppContext } from '../../context/app.context';
import { addLike, deleteLiked } from '../../utils/MainApi';

const MoviesCard = (movie) => {
	const context = useContext(AppContext);
	const history = useHistory()
	let { pathname } = useLocation();
	const [like, setLike] = useState(pathname === '/saved-movies' ? true : false);

	const likeHandler = async (e) => {
		e.preventDefault()
		if (!like) {
			setLike(prev => !prev)
			await addLike(movie, context).then(res => {
				if (res === 401) {
					context.setCurrentUser({});
					localStorage.clear();
					return history.push('/')
				} else {
					context.setLikedMovies([...context.likedMovies, res]);
				}
			});
		} else {
			setLike(prev => !prev)
			deleteLiked(movie.movieId ? movie.movieId : movie.id, context).then(res => {
				if (res === 401) {
					context.setCurrentUser({});
					localStorage.clear();
					return history.push('/')
				} else {
					context.setLikedMovies([...context.likedMovies.filter(movie => movie.nameRU !== res.nameRU)]);
				}
			});
		}
	}

	useEffect(() => {
		return () => {
			pathname = null;
		}
	}, [])

	useEffect(() => {
		(async () => {
			if (pathname !== '/saved-movies') {
				setLike(await context.likedMovies.find(e => {
					return e.nameRU === movie.nameRU
				}))
			}
		})()
	}, [context.likedMovies, context.filtered, context.searchString])

	// заголовок уже второго уровня
	return (
		<li key={movie.id || movie.movieId} className="movies-card" >
			<a href={movie.trailerLink} target='_blank' className="movies-card_link">
				<img src={pathname === '/movies' ? "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url : movie.image}
					alt={`${movie.nameRU}_${movie.id || movie.movieId}`} className="movies-card__img" />
				<div className="movies-card__description-wrapper">
					<h2 className="movies-card__title">{movie.nameRU}</h2>
					<span className="movies-card__duration">{Math.floor(movie.duration / 60)}ч {Math.floor(movie.duration - Math.floor(movie.duration / 60) * 60)}м</span>
				</div>
				{!like
					? <span className="movies-card__icon_save" onClick={(e) => likeHandler(e)}>
						Сохранить
					</span>
					:
					<span className="movies-card__icon_delete" onClick={(e) => likeHandler(e)}>
						<img
							width={12}
							height={12}
							src={deleteCardIcon}
							alt={'Удалить фильм'}
						/>
					</span>}
				{like && <span className="movies-card__icon_saved" onClick={(e) => likeHandler(e)}>
					<img
						width={12}
						height={12}
						src={savedCardIcon}
						alt={'Сохранено'}
					/>
				</span>}
			</a>
		</li>
	);
};

export default MoviesCard;
