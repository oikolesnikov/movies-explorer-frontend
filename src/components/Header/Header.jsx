import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import NavigationLink from '../NavigationLink/NavigationLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import { navLinks } from '../../config/links';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';

const Header = ({ isLoggedIn = true }) => {
	const [burgerVisible, setBurgerVisible] = useState(false);

	const burgerVisibilityHandler = () => {
		setBurgerVisible(!burgerVisible);
	};
	return (
		<>
			<header className="header container">
				<Logo />
				{/* навигация авторизованного пользователя */}
				<div className="header__loggedin-nav-wrapper">
					{isLoggedIn ? <Navigation links={navLinks} /> : ''}
				</div>
				{/* навигация неавторизованного пользователя */}
				{!isLoggedIn ? (
					<nav className="header__auth-nav">
						<ul className="header__nav-list">
							<li className="header__nav-item">
								<NavigationLink path={'/signup'} caption={'Регистрация'} />
							</li>
							<li className="header__nav-item">
								<NavigationLink
									path={'/signin'}
									caption={'Войти'}
									className={'navigation-link_login'}
								/>
							</li>
						</ul>
					</nav>
				) : (
					<ProfileLink className={'header__profile-link'} />
				)}
				{/* бургер-меню */}
				<>
					<button
					    type="button"
						className={`header__burger-menu-icon ${burgerVisible ? 'active' : ''}`}
						onClick={burgerVisibilityHandler}>
						<span className="header__burger-menu-line" />
					</button>
				</>
			</header>

			{isLoggedIn ? <BurgerMenu burgerVisible={burgerVisible} setBurgerVisible={setBurgerVisible} /> : <></>}
		</>
	);
};

export default Header;
