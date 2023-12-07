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
                <img src={movie01} alt="33 слова о дизайне" className="movie__img" />
                <h3 className="movie__name">33 слова о дизайне</h3>
                <img src={likeIcon} alt="like movie" className="movie__like movie__like_active" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie02} alt="" className="movie__img" />
                <h3 className="movie__name">Киноальманах «100 лет дизайна»</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie03} alt="" className="movie__img" />
                <h3 className="movie__name">В погоне за Бенкси</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie04} alt="" className="movie__img" />
                <h3 className="movie__name">Баския: Взрыв реальности</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie05} alt="" className="movie__img" />
                <h3 className="movie__name">Бег это свобода</h3>
                <img src={likeIcon} alt="like movie" className="movie__like movie__like_active" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie06} alt="" className="movie__img" />
                <h3 className="movie__name">Книготорговцы</h3>
                <img src={likeIcon} alt="like movie" className="movie__like movie__like_active" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie07} alt="" className="movie__img" />
                <h3 className="movie__name">Когда я думаю о Германии ночью</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie08} alt="" className="movie__img" />
                <h3 className="movie__name">Gimme Danger: История Игги и The Stooges</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie09} alt="" className="movie__img" />
                <h3 className="movie__name">Дженис: Маленькая девочка грустит</h3>
                <img src={likeIcon} alt="like movie" className="movie__like movie__like_active" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie10} alt="" className="movie__img" />
                <h3 className="movie__name">Соберись перед прыжком</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie11} alt="" className="movie__img" />
                <h3 className="movie__name">Пи Джей Харви: A dog called money</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie12} alt="" className="movie__img" />
                <h3 className="movie__name">По волнам: Искусство звука в кино</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie13} alt="" className="movie__img" />
                <h3 className="movie__name">Рудбой</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie14} alt="" className="movie__img" />
                <h3 className="movie__name">Скейт — кухня</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie15} alt="" className="movie__img" />
                <h3 className="movie__name">Война искусств</h3>
                <img src={dislikeIcon} alt="like movie" className="movie__like" />
                <div className="movie__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie16} alt="" className="movie__img" />
                <h3 className="movie__name">Зона</h3>
                <img src={likeIcon} alt="like movie" className="movie__like movie__like_active" />
                <div className="movie__duration">1ч 42м</div>
            </div>
        </section>
    )
}
