import './moviesCard.css';
import likeIcon from '../../images/icon_like_movie.svg';
import dislikeIcon from '../../images/icon_dislike_movie.svg';
import movie01 from '../../images/movie01.png';
import movie02 from '../../images/movie02.png';
import movie03 from '../../images/movie03.png';
import movie04 from '../../images/movie04.png';
import movie05 from '../../images/movie05.png';
import movie06 from '../../images/movie06.png';
import movie07 from '../../images/movie07.png';
import movie08 from '../../images/movie08.png';
import movie09 from '../../images/movie09.png';
import movie10 from '../../images/movie10.png';
import movie11 from '../../images/movie11.png';
import movie12 from '../../images/movie12.png';
import movie13 from '../../images/movie13.png';
import movie14 from '../../images/movie14.png';
import movie15 from '../../images/movie15.png';
import movie16 from '../../images/movie16.png';
import React from "react";
import {useLocation} from "react-router-dom";
import deleteIcon from "../../images/icon_delete_movie.png";

export default function MoviesCard({ movie }) {
    const location = useLocation();

    return (
        <section className="movieCard">
            <a className="movieCard__trailer" href={movie.trailerLink} target="_blank">
                <img src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} className="movieCard__img" />
            </a>
            <h3 className="movieCard__name">{movie.nameRU}</h3>
            { location.pathname === '/saved-movies' ?
                (
                    <img src={deleteIcon} alt="like movie" className="movieCard__delete" />
                ) : (
                    <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                ) }
            <div className="movieCard__duration">{movie.duration}</div>
        </section>
    )
}
