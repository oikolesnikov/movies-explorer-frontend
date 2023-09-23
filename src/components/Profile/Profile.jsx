import React, { useContext, useState, useEffect } from 'react';

import './Profile.css';
import { Link, useHistory } from 'react-router-dom';
import { editProfile } from '../../utils/MainApi';
import { AppContext } from '../../context/app.context';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
	const context = useContext(AppContext);

  const history = useHistory();

  if (!context.currentUser.token) {
    history.push('/')
  }

	const [name, setName] = useState(context.currentUser.name);
	const [email, setEmail] = useState(context.currentUser.email);

	const logoutHandler = async (e) => {
		e.preventDefault(e);

		context.setCurrentUser({});
		localStorage.clear();
		history.push('/')
	}

	useEffect(() => {
    if (context.error) {
      toast(context.error)
      setTimeout(() => {
        context.setError('')
      }, 5000)
    }
  }, [context.error])

	const editProfileHandler = async (e) => {
		e.preventDefault();

		if (name === context.currentUser.name && email === context.currentUser.email) {
			return toast('Имя и емайл должны отличаться от действуюших');
		}

		if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			return toast('Введён некорректный емайл');
		}

		try {
			await editProfile({...context.currentUser, name, email}, context).then(res => {
				if (res === 401) {
					context.setCurrentUser({});
					localStorage.clear();
					history.push('/')
				}
			})
		} catch (e) {
			console.error(e);
			throw new Error(e);
		}
	}

	return (
		<section className="profile container">
			<div className="profile__container">
				<h1 className="profile__title">Привет, {context.currentUser.name}!</h1>
				<form className="profile__edit-form">
					<div className="profile__edit-form-container">
						<label htmlFor="profile-name" className="profile__label">
							Имя
							<input placeholder="Имя" type="text" id="profile-name" className="profile__input" value={name} onChange={e => setName(e.target.value)} disabled={context.loading}/>
						</label>
						<label htmlFor="profile-email" className="profile__label">
							E-mail
							<input
								placeholder="email"
								type="email"
								id="profile-email"
								className="profile__input"
								value={email}
								onChange={e => setEmail(e.target.value)}
								disabled={context.loading}
							/>
						</label>
					</div>

					<div className="profile__control">
						<button onClick={(e) => editProfileHandler(e)} className="profile__button profile__button_edit-confirm" disabled={(name === context.currentUser.name && email === context.currentUser.email) || context.loading}>
							Редактировать

						</button>
						<Link to="/" className="profile__button profile__button_logout" onClick={(e) => logoutHandler(e)}>
							Выйти из аккаунта
						</Link>
					</div>
				</form>
			</div>
			<ToastContainer/>
		</section>
	);
};

export default Profile;
