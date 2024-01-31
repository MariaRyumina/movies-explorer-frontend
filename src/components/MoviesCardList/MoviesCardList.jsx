import React from 'react';
import { useLocation } from "react-router-dom";
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
                                           movies,
                                           onSaveMovie,
                                           onDeleteMovie,
                                           hideButtonMoreMovies,
                                           showMoreMoviesCard,
                                       }) {
    const location = useLocation();

    return (
        <section className="moviesCardList">
            <div className="moviesCardList__movies">
                {
                    movies
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
