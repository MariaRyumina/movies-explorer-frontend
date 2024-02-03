import './moviesCard.css';
import React from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
                                       movie,
                                       onSaveMovie,
                                       onDeleteMovie,
}) {
    const location = useLocation();

    //лайк/сохранение в избранное
    function handleSaveMovie () {
        onSaveMovie(movie);
    }

    function handleDeleteMovie () {
        onDeleteMovie(movie);
    }

    //пересчет длительности фильма из минут в часы и минуты
    function getTimeFromMin (min) {
        let hours = Math.trunc(min/60);
        let minutes = min % 60;
        return hours + 'ч ' + minutes + 'м';
    }

    return (
        <section className="movieCard">
            <a className="movieCard__trailer" href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.nameRU} className="movieCard__img" />
            </a>
            <h3 className="movieCard__name">{movie.nameRU}</h3>
            { location.pathname === '/saved-movies' ? (
                    <button
                        onClick={handleDeleteMovie}
                        className="movieCard__delete" />
                ) : (
                    <button
                        onClick={handleSaveMovie}
                        className={`movieCard__like ${movie.isLiked &&'movieCard__like_active'}`} />
                ) }
            <div className="movieCard__duration">{getTimeFromMin(movie.duration)}</div>
        </section>
    )
}
