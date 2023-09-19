import React from "react";
import "./SavedMovies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { savedMovies } from "../../config/links";

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchFilm />
        <MoviesCardList links={savedMovies} />
      </div>
    </main>
  );
};

export default SavedMovies;
