import React, { useContext, useState, useEffect } from 'react';

import './Profile.css';
import { Link, useHistory } from 'react-router-dom';
import { editProfile } from '../../utils/MainApi';
import { AppContext } from '../../context/app.context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
	const context = useContext(AppContext);

	const history = useHistory();

	if (!context.currentUser.token) {
		history.push('/')
	}

	const [emailError, setEmailError] = useState(false)
	const [nameError, setNameError] = useState(false)

	const emailBlurHandler = (e) => {
		if (!e.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setEmailError(true)
		} else {
			setEmailError(false)
		}
	}
	const nameBlurHandler = (e) => {
		if (e.target.value.length < 2 || e.target.value.length > 30 || e.target.value === context.currentUser.name) {
			setNameError(true)
		} else {
			setNameError(false)
		}

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

		if (name && name === context.currentUser.name && email === context.currentUser.email) {
			setNameError(true)
			setEmailError(true)
		}

		if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setEmailError(true);
		}

		if (emailError || nameError) {
			return;
		}
		editProfile({ ...context.currentUser, name, email }, context)
			.then(user => {

				if (user === 401) {
					context.setCurrentUser({});
					localStorage.clear();
					return history.push('/')
				}

				const oldStorage = JSON.parse(localStorage.getItem('user'))

				localStorage.setItem('user', JSON.stringify({ ...oldStorage, name: user.name, email: user.email }));

				context.setCurrentUser({ ...user, token: oldStorage.token });
				context.setLoading(false);

				toast('Данные успешно обновлены')

				return user;
			})
			.catch(e => {
				context.setLoading(false);
				context.setError("Не удалось изменить профиль");
				console.error(e);
				return e
			})
	}

	return (
		<section className="profile container">
			<div className="profile__container">
				<h1 className="profile__title">Привет, {context.currentUser.name}!</h1>
				<form className="profile__edit-form">
					<div className="profile__edit-form-container">
						<label htmlFor="profile-name" className="profile__label">
							Имя
							<input placeholder="Имя" type="text" id="profile-name" onFocus={e => setNameError(false)} value={name} onChange={e => setName(e.target.value)} disabled={context.loading} onBlur={nameBlurHandler} className={`profile__input ${nameError ? 'error' : ''}`} />
						</label>
						<span className={`auth-form__error-message ${nameError ? 'show' : ''}`}>Имя должно отличатся от действующего и быть не менее 2 символов</span>
						<label htmlFor="profile-email" className="profile__label">
							E-mail
							<input
								placeholder="email"
								type="email"
								id="profile-email"
								className={`profile__input ${emailError ? 'error' : ''}`}
								value={email}
								onChange={e => setEmail(e.target.value)}
								disabled={context.loading}
								onBlur={emailBlurHandler}
								onFocus={e => setEmailError(false)}
							/>
						</label>
						<span className={`auth-form__error-message ${emailError ? 'show' : ''}`}>Введён некорректный емайл</span>
					</div>

					<div className="profile__control">
						<button onClick={(e) => editProfileHandler(e)} className="profile__button profile__button_edit-confirm" disabled={(name === context.currentUser.name && email === context.currentUser.email) || context.loading || nameError || emailError}>
							Редактировать

						</button>
						<Link to="/" className="profile__button profile__button_logout" onClick={(e) => logoutHandler(e)}>
							Выйти из аккаунта
						</Link>
					</div>
				</form>
			</div>
			<ToastContainer />
		</section>
	);
};

export default Profile;
