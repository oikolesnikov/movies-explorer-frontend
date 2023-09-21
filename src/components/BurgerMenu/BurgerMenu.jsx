import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import ProfileLink from "../ProfileLink/ProfileLink";

const BurgerMenu = ({burgerVisible, setBurgerVisible}) => {
  const burgerVisibilityHandler = () => {
    setBurgerVisible(!burgerVisible);
  };

  return (
		<>
			<div className={`overlay ${burgerVisible ? 'active' : ''}`} onClick={burgerVisibilityHandler}>
				<div className="overlay__burger-menu">
					<nav className="overlay__burger-menu-nav">
						<ul className="overlay__burger-menu-nav-list">
							<li className="overlay__burger-menu-list-item">
								<NavLink
									exact
									to="/"
									className="overlay__burger-menu-link"
									activeClassName="overlay__burger-menu-link_active">
									Главная
								</NavLink>
							</li>
							<li className="overlay__burger-menu-list-item">
								<NavLink
									to="/movies"
									className="overlay__burger-menu-link"
									activeClassName="overlay__burger-menu-link_active">
									Фильмы
								</NavLink>
							</li>
							<li className="overlay__burger-menu-list-item">
								<NavLink
									to="/saved-movies"
									className="overlay__burger-menu-link"
									activeClassName="overlay__burger-menu-active">
									Сохранённые фильмы
								</NavLink>
							</li>

							<li className="overlay__burger-menu-list-item">
								<ProfileLink className={'overlay__burger-menu-profile-link'} />
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default BurgerMenu;
