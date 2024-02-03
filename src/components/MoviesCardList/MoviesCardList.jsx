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
                                           valueInput,
                                       }) {
    const location = useLocation();

    return (
        <section className="moviesCardList">
            <div className="moviesCardList__movies">
                {movies.length === 0 && valueInput !== ''  ? (
                    <p className="moviesCardList__not-found">Ничего не найдено</p>
                ) : (
                        movies.map(movie => (
                            <MoviesCard
                                key={movie.movieId}
                                movie={movie}
                                onSaveMovie={onSaveMovie}
                                onDeleteMovie={onDeleteMovie}
                            />
                        ))
                )}
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
