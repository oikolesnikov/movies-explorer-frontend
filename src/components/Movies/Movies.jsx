import React from "react";
import "./Movies.css";
import SearchFilm from "../SearchFilm/SearchFilm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { movies } from "../../config/links";

const Movies = () => {
  return (
    <main>
      <div className="movies__container">
        <SearchFilm className={"movies__search-film"} />
        <MoviesCardList links={movies} />
      </div>

      <button type="button" className="movies__load-more">
        <span className="movies__more-caption">Ещё</span>
      </button>
    </main>
  );
};

export default Movies;
