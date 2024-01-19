import React from 'react';
import './savedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({ infoPopup, openPopup, movies }) {
    return (
        <>
            <SearchForm
                infoPopup={infoPopup}
                openPopup={openPopup}
            />
            <MoviesCardList
                movies={movies}
            />
        </>
    )
}
