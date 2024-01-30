import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import iconError from "../../images/icon_error.png";
import {ERROR_VALIDATION_REQUIRED_NAME} from "../../utils/constants";

export default function Movies({
                                   movies,
                                   setMovies,
                                   getBeatFilms,
                                   infoPopup,
                                   openPopup,
                                   onSaveMovie,
                                   widthWindow,
                                   valueInput,
                                   setValueInput,
                                   isLoaded,
                                   moviesFiltration,
                               }) {
    function searchMovies () {
        if (isLoaded) {
            if (valueInput !== "") {
                moviesFiltration(JSON.parse(localStorage.getItem("movies")), setMovies);
            } else {
                infoPopup(iconError, ERROR_VALIDATION_REQUIRED_NAME);
                openPopup();
            }
        } else if (valueInput !== "") {
            getBeatFilms();
        } else {
            infoPopup(iconError, ERROR_VALIDATION_REQUIRED_NAME);
            openPopup();
        }
    }

    return (
        <section className="movies">
            <SearchForm
                valueInput={valueInput}
                setValueInput={setValueInput}
                searchMovies={searchMovies}
                moviesFiltration={moviesFiltration}
                setMovies={setMovies}
                movies={JSON.parse(localStorage.getItem("movies")) ?? []}
            />
            <MoviesCardList
                movies={movies}
                onSaveMovie={onSaveMovie}
                widthWindow={widthWindow}
            />
        </section>
    )
}
