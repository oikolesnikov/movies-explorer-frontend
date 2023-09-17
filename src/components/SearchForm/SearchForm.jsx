import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import "../Button/Button.css";

function SearchForm() {
  return (
    <article className="search-form">
      <form className="search-form__form">
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button className="search-form__submit button"></button>
        </div>
        <FilterCheckbox></FilterCheckbox>
      </form>
    </article>
  );
}

export default SearchForm;
