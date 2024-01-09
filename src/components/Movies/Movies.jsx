import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({ movies, getFilms }) {
    return (
        <section className="movies">
            <SearchForm
                getFilms={getFilms}
            />
            <MoviesCardList
                movies={movies}
            />
        </section>
    )
}
