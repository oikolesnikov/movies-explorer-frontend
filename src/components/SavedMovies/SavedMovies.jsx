import React from "react";
import "./SavedMovies.css";
import SearchFilm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { savedMovies } from "../../config/links";

const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <SearchFilm />
        <MoviesCardList links={savedMovies} />
      </div>
    </section>
  );
};

export default SavedMovies;
