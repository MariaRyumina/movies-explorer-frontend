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

export default function MoviesCard() {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = (event) => setWidth(event.target.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <section className="movieCard">
            <div className="movieCard__container">
                <img src={movie01} alt="33 слова о дизайне" className="movieCard__img" />
                <h3 className="movieCard__name">33 слова о дизайне</h3>
                <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                <div className="movieCard__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie02} alt="" className="movieCard__img" />
                <h3 className="movieCard__name">Киноальманах «100 лет дизайна»</h3>
                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                <div className="movieCard__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie03} alt="" className="movieCard__img" />
                <h3 className="movieCard__name">В погоне за Бенкси</h3>
                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                <div className="movieCard__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie04} alt="" className="movieCard__img" />
                <h3 className="movieCard__name">Баския: Взрыв реальности</h3>
                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                <div className="movieCard__duration">1ч 42м</div>
            </div>
            <div className="movieCard__container">
                <img src={movie05} alt="" className="movieCard__img" />
                <h3 className="movieCard__name">Бег это свобода</h3>
                <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                <div className="movieCard__duration">1ч 42м</div>
            </div>

            { width > 480 &&
                <>
                    <div className="movieCard__container">
                        <img src={movie06} alt="" className="movieCard__img" />
                        <h3 className="movieCard__name">Книготорговцы</h3>
                        <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                        <div className="movieCard__duration">1ч 42м</div>
                    </div>
                    <div className="movieCard__container">
                        <img src={movie07} alt="" className="movieCard__img" />
                        <h3 className="movieCard__name">Когда я думаю о Германии ночью</h3>
                        <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                        <div className="movieCard__duration">1ч 42м</div>
                    </div>
                    <div className="movieCard__container">
                        <img src={movie08} alt="" className="movieCard__img" />
                        <h3 className="movieCard__name">Gimme Danger: История Игги и The Stooges</h3>
                        <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                        <div className="movieCard__duration">1ч 42м</div>
                    </div>

                    { width > 768 &&
                        <>
                            <div className="movieCard__container">
                                <img src={movie09} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Дженис: Маленькая девочка грустит</h3>
                                <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie10} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Соберись перед прыжком</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie11} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Пи Джей Харви: A dog called money</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie12} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">По волнам: Искусство звука в кино</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie13} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Рудбой</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie14} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Скейт — кухня</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie15} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Война искусств</h3>
                                <img src={dislikeIcon} alt="like movie" className="movieCard__like" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                            <div className="movieCard__container">
                                <img src={movie16} alt="" className="movieCard__img" />
                                <h3 className="movieCard__name">Зона</h3>
                                <img src={likeIcon} alt="like movie" className="movieCard__like movieCard__like_active" />
                                <div className="movieCard__duration">1ч 42м</div>
                            </div>
                        </>
                    }
                </>
            }
        </section>
    )
}
