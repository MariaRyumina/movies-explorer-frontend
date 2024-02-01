import React, {useEffect, useState} from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {
    INITIAL_MOVIES_ON_LARGE_SCREEN,
    INITIAL_MOVIES_ON_MEDIUM_SCREEN,
    INITIAL_MOVIES_ON_SMALL_SCREEN,
    INITIAL_MOVIES_ON_X_SMALL_SCREEN,
    LARGE_SCREEN,
    MEDIUM_SCREEN,
    MORE_MOVIES_ON_LARGE_SCREEN,
    MORE_MOVIES_ON_MEDIUM_SCREEN,
    MORE_MOVIES_ON_SMALL_SCREEN,
    SMALL_SCREEN,
} from "../../utils/constants";

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
    const [initialMovies, setInitialMovies] = useState(0); //начальное количество отображаемых фильмов, до нажатия на кнопку "Еще"

    //количество отображаемых карточек
    useEffect(() => {
        if (widthWindow >= LARGE_SCREEN) {
            setInitialMovies(INITIAL_MOVIES_ON_LARGE_SCREEN)
        } else if (widthWindow >= MEDIUM_SCREEN) {
            setInitialMovies(INITIAL_MOVIES_ON_MEDIUM_SCREEN)
        } else if (widthWindow >= SMALL_SCREEN) {
            setInitialMovies(INITIAL_MOVIES_ON_SMALL_SCREEN)
        } else {
            setInitialMovies(INITIAL_MOVIES_ON_X_SMALL_SCREEN)
        }
    }, [widthWindow])

    //изменение количества отображаемых карточек нажатием на кнопку "Еще"
    const showMoreMoviesCard = () => {
        if (widthWindow >= LARGE_SCREEN) {
            setInitialMovies(initialMovies + MORE_MOVIES_ON_LARGE_SCREEN)
        } else if (widthWindow >= MEDIUM_SCREEN) {
            setInitialMovies(initialMovies + MORE_MOVIES_ON_MEDIUM_SCREEN)
        } else {
            setInitialMovies(initialMovies + MORE_MOVIES_ON_SMALL_SCREEN)
        }
    }

    //скрытие кнопки "Еще"
    const hideButtonMoreMovies = () => {
        if (initialMovies >= movies.length) {
            return false
        } else return movies.length !== 0;
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
            />
            <MoviesCardList
                movies={movies.slice(0, initialMovies)}
                onSaveMovie={onSaveMovie}
                widthWindow={widthWindow}
                initialMovies={initialMovies}
                showMoreMoviesCard={showMoreMoviesCard}
                hideButtonMoreMovies={hideButtonMoreMovies}
                valueInput={valueInput}
            />
        </section>
    )
}
