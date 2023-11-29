import React from 'react';
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

export default function MoviesCard() {
    return (
        <section className="movieCard">
            <div className="movieCard__container">
                <img src={movie01} alt="" className="movie__img" />
                <h3 className="movie__title">33 слова о дизайне</h3>
                <img src={likeIcon} alt="like movie" className="movie__like_active" />
                <time></time>
            </div>

        </section>
    )
}