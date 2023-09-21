import React, { useContext, useState } from "react";
import "./AuthForm.css";
import { NavLink } from "react-router-dom";
import { registration, login } from '../../utils/MainApi';
import { AppContext } from '../../context/app.context';
import { useHistory } from "react-router-dom";

const AuthForm = ({ children, authTextsParams }) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const context = useContext(AppContext);
	const history = useHistory();

	const registrationHandler = async (e) => {
		e.preventDefault();
		try {
			if (email && password && name) {
				const user = await registration({ email, password, name }, context);

				if (user) {
					history.push('/movies')
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			if (email && password) {
				const token = await login({ email, password }, context);
				if (token) {
					history.push('/movies')
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<form autoComplete="off" className="auth-form" onSubmit={history.location.pathname === '/signup' ? (e) => registrationHandler(e) : (e) => loginHandler(e)}>
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
						required
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
							required

						/>
						<span className="auth-form__error-message">
							Что-то пошло не так...
						</span>
					</label> : ''}
			</div>
			{/* /.auth-form__inputs-wrapper */}



			<div className="auth-form__control-wrapper">
				{history.location.pathname === '/signup'
				? <button type='submit' className="auth-form__submit-button" disabled={!email || !name || !password}>
					<span className="auth-form__button-caption">{authTextsParams.buttonCaption}</span>
				</button>
				: <button type='submit' className="auth-form__submit-button" disabled={!email || !password}>
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
