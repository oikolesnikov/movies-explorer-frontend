import React from 'react';
import { useLocation } from 'react-router-dom';
import savedCardIcon from '../../images/save-button_state_on.svg';
import unsavedCardIcon from '../../images/save-button_state_off.svg';
import deleteCardIcon from '../../images/delete-button.svg';
import './MoviesCard.css';

const MoviesCard = ({ _id, url, title, duration }) => {
	const { pathname } = useLocation();
	const isSelected = false;
	const сardIconSaveState = isSelected ? savedCardIcon : unsavedCardIcon;
	const cardIconState = pathname === '/movies' ? сardIconSaveState : deleteCardIcon;

	// заголовок уже второго уровня
	return (
		<li key={_id} className="movies-card">
			<img src={url} alt={`${title}_${_id}`} className="movies-card__img" />
			<div className="movies-card__description-wrapper">
				<h2 className="movies-card__title">{title}</h2>
				<span className="movies-card__duration">{duration}</span>
			</div>
			<span className="movies-card__icon">
				<img
					width={12}
					height={12}
					src={cardIconState}
					alt={'Удалить фильм'}
				/>
			</span>
		</li>
	);
};

export default MoviesCard;
