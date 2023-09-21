import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
  links = [],
}) => {
  return (
    <section className="movies-card-list container">
      <p className="movies-card-list__empty-text">Здесь пока ничего нет</p>
      <ul className="movies-card-list__ul">
        {links.map((item, index) => {
          return <MoviesCard
            {...item}
            image={item.image}
            key={index}
          />

        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
