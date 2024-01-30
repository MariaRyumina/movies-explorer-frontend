import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { SCREEN_LARGE, SCREEN_MEDIUM, SCREEN_SMALL } from "../../utils/const-breakpoints";

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
        if (widthWindow >= SCREEN_LARGE) {
            setInitialMovies(16)
        } else if (widthWindow >= SCREEN_MEDIUM) {
            setInitialMovies(9)
        } else if (widthWindow >= SCREEN_SMALL) {
            setInitialMovies(8)
        } else {
            setInitialMovies(5)
        }
    }, [widthWindow])

    //изменение количества отображаемых карточек нажатием на кнопку "Еще"
    const showMoreMoviesCard = () => {
        if (widthWindow >= SCREEN_LARGE) {
            setInitialMovies(initialMovies + 4)
        } else if (widthWindow >= SCREEN_MEDIUM) {
            setInitialMovies(initialMovies + 3)
        } else {
            setInitialMovies(initialMovies + 2)
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
