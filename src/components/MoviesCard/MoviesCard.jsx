import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const handleDeleteClick = () => {
    console.log();
  };

  const location = useLocation();

  return (
    <article className="movie-card">
      <div className="movie-card__picture">
        <img
          src={props.movie.link}
          alt={props.movie.name}
          className="movie-card__image"
        />
        {props.movie.savedFavorite ? (
          <button
            className={
              location.pathname === "/saved-movies"
                ? "movie-card__delete movie-card__favorite-position  movie-card__delete-from-saved-movie"
                : "movie-card__delete movie-card__favorite-position  movie-card__delete-from-movie"
            }
          ></button>
        ) : (
          <button
            className="movie-card__favorite movie-card__favorite-position"
            onClick={handleDeleteClick}
          >
            Сохранить
          </button>
        )}
      </div>
      <div className="movie-card__description">
        <h2 className="movie-card__title">{props.movie.name}</h2>
        <div className="movie-card__duration-container">
          <p className="movie-card__duration">{props.movie.duration}</p>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
