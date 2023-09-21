import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import NavigationLink from '../NavigationLink/NavigationLink';
import ProfileLink from '../ProfileLink/ProfileLink';
import { navLinks } from '../../config/links';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';

const Header = () => {
	const [burgerVisible, setBurgerVisible] = useState(false);
	const context = useContext(AppContext);

	const burgerVisibilityHandler = () => {
		setBurgerVisible(!burgerVisible);
	};

	return (
		<>
			<header className="header container">
				<Logo />
				{/* навигация авторизованного пользователя */}
				{context.currentUser.token && <div className="header__loggedin-nav-wrapper">
					{context.currentUser ? <Navigation links={navLinks} /> : ''}
				</div>}
				{/* навигация неавторизованного пользователя */}
				{!context.currentUser.token ? (
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

			{context.currentUser.token ? <BurgerMenu burgerVisible={burgerVisible} setBurgerVisible={setBurgerVisible} /> : <></>}
		</>
	);
};

export default Header;
