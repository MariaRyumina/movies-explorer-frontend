import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({
                                        movies,
                                        infoPopup,
                                        openPopup,
                                        onDeleteMovie,
                                        valueInput,
                                        setValueInput,
                                        isShortMovies,
                                        setIsShortMovies,
                                    }) {
    return (
        <>
            <SearchForm
                valueInput={valueInput}
                setValueInput={setValueInput}
                isShortMovies={isShortMovies}
                setIsShortMovies={setIsShortMovies}
                infoPopup={infoPopup}
                openPopup={openPopup}
            />
            <MoviesCardList
                movies={movies}
                onDeleteMovie={onDeleteMovie}
            />
        </>
    )
}
