import './moviesCard.css';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
                                       movie,
                                       onSaveMovie,
                                       savedMovies
}) {
    const location = useLocation();

    const isLiked = savedMovies.some(m => m.movieId === movie.id); //возвращается true or false

    function handleSaveMovie () {
        onSaveMovie(movie, isLiked);
    }

    function getTimeFromMin (min) {
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'ч ' + minutes + 'м';
    }

    return (
        <section className="movieCard">
            <a className="movieCard__trailer" href={movie.trailerLink} target="_blank">
                <img src={movie.image} alt={movie.nameRU} className="movieCard__img" />
            </a>
            <h3 className="movieCard__name">{movie.nameRU}</h3>
            { location.pathname === '/saved-movies' ? (
                    <button className="movieCard__delete" />
                ) : (
                    <button
                        onClick={handleSaveMovie}
                        className={!isLiked ? "movieCard__like" : "movieCard__like movieCard__like_active"} />
                ) }
            <div className="movieCard__duration">{ getTimeFromMin(movie.duration) }</div>
        </section>
    )
}
