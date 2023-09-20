import React from 'react';

import './Profile.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Profile = () => {
	return (
		<section className="profile container">
			<div className="profile__container">
				<h1 className="profile__title">Привет, username!</h1>
				<form className="profile__edit-form">
					<div className="profile__edit-form-container">
						<label htmlFor="profile-name" className="profile__label">
							Имя
							<input placeholder="Имя" type="text" id="profile-name" className="profile__input" />
						</label>
						<label htmlFor="profile-email" className="profile__label">
							E-mail
							<input
								placeholder="email"
								type="email"
								id="profile-email"
								className="profile__input"
							/>
						</label>
					</div>

					<div className="profile__control">
						<button type="submit" className="profile__button profile__button_edit-confirm">
							Редактировать
						</button>
						<Link to="" className="profile__button profile__button_logout">
							Выйти из аккаунта
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Profile;
