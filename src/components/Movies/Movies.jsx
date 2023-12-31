import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({ movies }) {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
        </section>
    )
}
