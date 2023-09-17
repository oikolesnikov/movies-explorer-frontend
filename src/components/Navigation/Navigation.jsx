import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import "../Button/Button.css";
import "../Link/Link.css";
import { useLocation } from "react-router-dom";
import Burger from "../Burger/Burger";
import Popup from "../Popup/Popup";

function Navigation() {
  const location = useLocation();

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  const handleBurgerOneClick = () => {
    if (isBurgerOpen) {
      setBurgerOpen(false);
    } else {
      setBurgerOpen(true);
    }
  };

  const handleNavLinkClick = () => {
    setBurgerOpen(false);
  };

  return (
    <section className="navigation">
      <Burger
        handleOneClick={handleBurgerOneClick}
        isBurgerOpen={isBurgerOpen}
      ></Burger>
      <nav
        className={`navigation__nav-menu ${
          isBurgerOpen ? "navigation__nav-menu_active" : ""
        }`}
      >
        <ul className="navigation__nav-link-list">
          {isBurgerOpen ? (
            <li className="navigation__nav-link-item">
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "navigation__nav-link navigation__nav-link_active link"
                    : "navigation__nav-link link"
                }
                onClick={handleNavLinkClick}
              >
                Главная
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className="navigation__nav-link-item">
            <Link
              to="/movies"
              className={
                location.pathname === "/movies"
                  ? "navigation__nav-link navigation__nav-link_active link"
                  : "navigation__nav-link link"
              }
              onClick={handleNavLinkClick}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__nav-link-item">
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/saved-movies"
                  ? "navigation__nav-link navigation__nav-link_active link"
                  : "navigation__nav-link link"
              }
              onClick={handleNavLinkClick}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="navigation__nav-link" onClick={handleNavLinkClick}>
          <button className="navigation__nav-link-profile button">
            Аккаунт
          </button>
        </Link>
      </nav>
      <Popup isBurgerOpen={isBurgerOpen}></Popup>
    </section>
  );
}

export default Navigation;
