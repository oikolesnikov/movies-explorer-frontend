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
			addLike(movie, context)
				.then(res => {
					context.setLoading(false);

					if (res === 401) {
						context.setCurrentUser({});
						localStorage.clear();
						return history.push('/')
					} else {
						context.setLikedMovies([...context.likedMovies, res]);
					}
				}).catch(e => {
					console.error(e);
					context.setLoading(false);
					context.setError(e.message);
					return e;
				});
		} else {
			setLike(prev => !prev)
			deleteLiked(movie.movieId ? movie.movieId : movie.id, context)
				.then(res => {
					context.setLoading(false);

					if (res === 401) {
						context.setCurrentUser({});
						localStorage.clear();
						return history.push('/')
					} else {
						context.setLikedMovies([...context.likedMovies.filter(movie => movie.nameRU !== res.nameRU)]);
						// context.setFilteredLikes(prev => [...prev.filter(e => e.nameRU !== res.nameRU)])
					}

					return res;
				}).catch(e => {
					console.error(e);
					context.setLoading(false);
					context.setError(e.message);
					return e;
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
				<img src={typeof movie.image === 'object' ? "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url : movie.image}
					alt={`${movie.nameRU}_${movie.id || movie.movieId}`} className="movies-card__img" />
				{/* <img src={pathname === '/movies' ? "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url : movie.image}
					alt={`${movie.nameRU}_${movie.id || movie.movieId}`} className="movies-card__img" /> */}
				<div className="movies-card__description-wrapper">
					<h2 className="movies-card__title">{movie.nameRU}</h2>
					<span className="movies-card__duration">{Math.floor(movie.duration / 60)}ч {Math.floor(movie.duration - Math.floor(movie.duration / 60) * 60)}м</span>
				</div>
				{pathname === '/movies' ?
				!like
					? <span className="movies-card__icon_save" onClick={(e) => likeHandler(e)}>
						Сохранить
					</span>
					:
					<span className="movies-card__icon_saved" onClick={(e) => likeHandler(e)}>
						<img
							width={12}
							height={12}
							src={savedCardIcon}
							alt={'Сохранено'}
						/></span> : ''}
				{like && pathname === '/saved-movies' ?
					<span className="movies-card__icon_delete" onClick={(e) => likeHandler(e)}>
						<img
							width={12}
							height={12}
							src={deleteCardIcon}
							alt={'Удалить фильм'}
						/>
					</span> : ''}
			</a>
		</li>
	);
};

export default MoviesCard;
