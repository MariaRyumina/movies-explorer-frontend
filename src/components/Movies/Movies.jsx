import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
                                   movies,
                                   getBeatFilms,
                                   infoPopup,
                                   openPopup,
                                   onSaveMovie,
                                   savedMovies
}) {

    return (
        <section className="movies">
            <SearchForm
                getBeatFilms={getBeatFilms}
                infoPopup={infoPopup}
                openPopup={openPopup}
            />
            <MoviesCardList
                movies={movies}
                onSaveMovie={onSaveMovie}
                savedMovies={savedMovies}
            />
        </section>
    )
}
