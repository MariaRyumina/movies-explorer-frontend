import React from 'react';
import { useLocation } from "react-router-dom";
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {
    const location = useLocation();

    return (
        <section className="moviesCardList">
            <div className="moviesCardList__movies">
                {movies.map(movie => (
                    <MoviesCard
                        key={movie._movieId}
                        movie={movie}
                    />
                ))}
            </div>

            {location.pathname === '/movies' && <button className="moviesCardList__more">Ещё</button>}
        </section>
    )
}
