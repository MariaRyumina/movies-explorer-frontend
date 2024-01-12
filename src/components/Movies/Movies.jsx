import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({ movies, getBeatFilms, infoPopup, openPopup }) {

    return (
        <section className="movies">
            <SearchForm
                getBeatFilms={getBeatFilms}
                infoPopup={infoPopup}
                openPopup={openPopup}
            />
            <MoviesCardList
                movies={movies}
            />
        </section>
    )
}
