import React, { useContext, useState } from "react";
import "./AuthForm.css";
import { NavLink } from "react-router-dom";
import { registration, login } from '../../utils/MainApi';
import { AppContext } from '../../context/app.context';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

const AuthForm = ({ children, authTextsParams }) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false)
	const [nameError, setNameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)

	const context = useContext(AppContext);
	const history = useHistory();

	const registrationHandler = async (e) => {
		e.preventDefault();
		if (email && password && name) {

			const errors = [];

			if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				toast('Введён некорректный емайл');
				errors.push('Введён некорректный емайл')
			}

			if (password.length < 2 || password.length > 30) {
				toast("Пароль должен быть не менее 2 и не более 30 символов")
				errors.push('Пароль должен быть не менее 2 и не более 30 символов')
			}

			if (name.length < 2 || name.length > 30) {
				toast("Имя должно быть не менее 2 и не более 30 символов")
				errors.push('Имя должно быть не менее 2 и не более 30 символов')
			}


			if (errors.length) {
				return;
			}

			registration({ email, password, name }, context).then(user => {
				context.setCurrentUser(user);
				context.setLoading(false);

				localStorage.setItem('user', JSON.stringify(user));

				if (user) {
					history.push('/movies')
				}
			})
				.catch(e => {
					context.setLoading(false);
					context.setError(e.message);
					console.error(e);
				})
		}
	}

	const emailBlurHandler = (e) => {
		if (!e.target.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			setEmailError(true)
			toast('Введён некорректный емайл');
		} else {
			setEmailError(false)
		}
	}

	const passwordBlurHandler = (e) => {
		if (e.target.value.length < 2 || password.length > 30) {
			setPassword(true)
			toast("Пароль должен быть не менее 2 и не более 30 символов")
		} else {
			setPasswordError(false)
		}
	}

	const nameBlurHandler = (e) => {
		if (e.target.value.length < 2 || name.length > 30) {
			setNameError(true)
			toast("Имя должно быть не менее 2 и не более 30 символов")
		} else {
			setNameError(false)
		}

	}

	const loginHandler = async (e) => {
		e.preventDefault();

		if (email && password) {
			const errors = [];

			if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				toast('Введён некорректный емайл');
				errors.push('Введён некорректный емайл')
			}

			if (password.length < 2 || password.length > 30) {
				toast("Пароль должен быть не менее 2 и не более 30 символов")
				errors.push('Пароль должен быть не менее 2 и не более 30 символов')
			}

			if (errors.length) {
				return;
			}

			login({ email, password }, context)
				.then(user => {
					context.setCurrentUser(user);
					context.setLoading(false);

					localStorage.setItem('user', JSON.stringify(user));

					if (user) {
						history.push('/movies')
					}
					return user;
				}).catch(e => {
					context.setLoading(false);
					context.setError(e.message);
					console.error(e);
				})
		}
	}

	return (
		<form autoComplete="off" className="auth-form">
			<div className="auth-form__inputs-wrapper">
				{children}
				<label htmlFor="email" className="auth-form__label">
					E-mail
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Введите email"
						type="email"
						id="email"
						minLength="2"
						maxLength="30"
						className="auth-form__input"
						required
						disabled={context.loading}
						onBlur={e => emailBlurHandler(e)}

					/>
					<span className="auth-form__error-message">Что-то пошло не так...</span>
				</label>
				<label htmlFor="password" className="auth-form__label">
					Пароль
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Введите пароль"
						type="password"
						id="password"
						minLength="2"
						maxLength="30"
						className="auth-form__input"
						disabled={context.loading}
						required
						onBlur={passwordBlurHandler}
					/>
					<span className="auth-form__error-message">Что-то пошло не так...</span>
				</label>
				{history.location.pathname === '/signup' ?
					<label htmlFor="name" className="auth-form__label">
						Имя
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							id="name"
							placeholder="Введите имя"
							minLength="2"
							maxLength="30"
							className="auth-form__input"
							disabled={context.loading}
							required
							onBlur={nameBlurHandler}
						/>
						<span className="auth-form__error-message">
							Что-то пошло не так...
						</span>
					</label> : ''}
			</div>
			{/* /.auth-form__inputs-wrapper */}

			<div className="auth-form__control-wrapper">
				{history.location.pathname === '/signup'
					? <button onClick={(e) => registrationHandler(e)} className="auth-form__submit-button" disabled={!email || !name || !password || context.loading || nameError || passwordError || emailError}>
						<span className="auth-form__button-caption">{authTextsParams.buttonCaption}</span>
					</button>
					: <button onClick={(e) => loginHandler(e)} className="auth-form__submit-button" disabled={!email || !password || context.loading || passwordError || emailError}>
						<span className="auth-form__button-caption">{authTextsParams.buttonCaption}</span>
					</button>}

				<p className="auth-form__redirect-question">
					{authTextsParams.question}
					<NavLink to={authTextsParams.path} className="auth-form__redirect-link">
						{authTextsParams.linkCaption}
					</NavLink>
				</p>
			</div>
			{/* /.auth-form__control-wrapper */}
		</form>
	);
};

export default AuthForm;
