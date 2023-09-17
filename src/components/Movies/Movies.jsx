import React from "react";
import movies from "../../utils/Movies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return (
    <section className="movies">
      <SearchForm></SearchForm>
      {/* <Preloader></Preloader> */}
      <MoviesCardList movies={movies}></MoviesCardList>
    </section>
  );
}

export default Movies;

