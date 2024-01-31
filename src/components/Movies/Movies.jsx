import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Movies({
                                   movies,
                                   infoPopup,
                                   openPopup,
                                   onSaveMovie,
                                   widthWindow,
                                   valueInput,
                                   setValueInput,
                                   isShortMovies,
                                   setIsShortMovies,
                               }) {
    function searchMovies(valueInput) {
        setValueInput(valueInput);
    }

    return (
        <section className="movies">
            <SearchForm
                valueInput={valueInput}
                setValueInput={setValueInput}
                isShortMovies={isShortMovies}
                setIsShortMovies={setIsShortMovies}
                infoPopup={infoPopup}
                openPopup={openPopup}
                searchMovies={searchMovies}
            />
            <MoviesCardList
                movies={movies}
                onSaveMovie={onSaveMovie}
                widthWindow={widthWindow}
            />
        </section>
    )
}
