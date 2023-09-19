import React from "react";

import "./Profile.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Profile = () => {
  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, username!</h1>
        <form className="profile__edit-form">
          <label htmlFor="profile-name" className="profile__label">
            Имя
            <input type="text" id="profile-name" className="profile__input" />
          </label>
          <label htmlFor="profile-email" className="profile__label">
            E-mail
            <input type="email" id="profile-email" className="profile__input" />
          </label>
          <div className="profile__control">
            <button
              type="submit"
              className="profile__button profile__button_edit-confirm"
            >
              Редактировать
            </button>
            <Link
              to=""
              className="profile__button profile__button_logout"
            >
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
