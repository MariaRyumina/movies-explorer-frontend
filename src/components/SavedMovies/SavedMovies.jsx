import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import iconError from "../../images/icon_error.png";

export default function SavedMovies({
                                        infoPopup,
                                        openPopup,
                                        movies,
                                        onDeleteMovie,
                                        moviesFiltration,
                                        setSavedMovies,
                                        valueInput,
                                        setValueInput,
                                    }) {
    function searchMovies () {
        if (valueInput !== "") {
            moviesFiltration(movies, setSavedMovies);
        } else {
            infoPopup(iconError, 'Введите название фильма!');
            openPopup();
        }
    }

    return (
        <>
            <SearchForm
                valueInput={valueInput}
                setValueInput={setValueInput}
                searchMovies={searchMovies}
                moviesFiltration={moviesFiltration}
                setMovies={setSavedMovies}
                movies={movies}
            />
            <MoviesCardList
                movies={movies}
                onDeleteMovie={onDeleteMovie}
            />
        </>
    )
}
