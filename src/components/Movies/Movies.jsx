import React, {useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
                                   movies,
                                   getBeatFilms,
                                   infoPopup,
                                   openPopup,
                                   onSaveMovie,
                                   widthWindow,
                                   valueInput,
                                   setValueInput,
                                   isShortMovies,
                                   setIsShortMovies,
                               }) {
    return (
        <section className="movies">
            <SearchForm
                valueInput={valueInput}
                setValueInput={setValueInput}
                getBeatFilms={getBeatFilms}
                infoPopup={infoPopup}
                openPopup={openPopup}
                movies={movies}
                isShortMovies={isShortMovies}
                setIsShortMovies={setIsShortMovies}
            />
            <MoviesCardList
                movies={movies}
                onSaveMovie={onSaveMovie}
                widthWindow={widthWindow}
            />
        </section>
    )
}
