import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {
    LARGE_SCREEN,
    MEDIUM_SCREEN,
    SMALL_SCREEN,
    MORE_MOVIES_ON_LARGE_SCREEN,
    MORE_MOVIES_ON_MEDIUM_SCREEN,
    MORE_MOVIES_ON_SMALL_SCREEN,
    INITIAL_MOVIES_ON_LARGE_SCREEN,
    INITIAL_MOVIES_ON_MEDIUM_SCREEN,
    INITIAL_MOVIES_ON_SMALL_SCREEN,
    INITIAL_MOVIES_ON_X_SMALL_SCREEN,
} from "../../utils/constants";

export default function MoviesCardList({
                                           movies,
                                           onSaveMovie,
                                           onDeleteMovie,
                                           widthWindow,
                                       }) {
    const location = useLocation();
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
        <section className="moviesCardList">
            <div className="moviesCardList__movies">
                {
                    movies
                        .slice(0, initialMovies)
                        .map(movie => (
                    <MoviesCard
                        key={movie.movieId}
                        movie={movie}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                    />
                ))}
            </div>
            
            { location.pathname === '/movies' && hideButtonMoreMovies() &&
                <button
                    onClick={showMoreMoviesCard}
                    className="moviesCardList__more"
                    type="button"
                >
                    Ещё
                </button>
            }
        </section>
    )
}
