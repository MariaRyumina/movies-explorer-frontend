import React from 'react';
import './savedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import movie01 from "../../images/movie01.png";
import deleteIcon from "../../images/icon_delete_movie.png";
import movie02 from "../../images/movie02.png";
import movie03 from "../../images/movie03.png";

export default function SavedMovies() {
    return (
        <>
            <SearchForm />
            <section className="savedMovie">
                <section className="savedMovies">
                    <div className="savedMovies__container">
                        <img src={movie01} alt="33 слова о дизайне" className="savedMovies__img" />
                        <h3 className="savedMovies__name">33 слова о дизайне</h3>
                        <img src={deleteIcon} alt="like movie" className="savedMovies__delete" />
                        <div className="savedMovies__duration">1ч 42м</div>
                    </div>
                    <div className="savedMovies__container">
                        <img src={movie02} alt="Киноальманах «100 лет дизайна»" className="savedMovies__img" />
                        <h3 className="savedMovies__name">Киноальманах «100 лет дизайна»</h3>
                        <img src={deleteIcon} alt="like movie" className="savedMovies__delete" />
                        <div className="savedMovies__duration">1ч 42м</div>
                    </div>

                    { (window.matchMedia("(min-width: 321px)").matches)
                        &&
                        <>
                            <div className="savedMovies__container">
                                <img src={movie03} alt="В погоне за Бенкси" className="savedMovies__img" />
                                <h3 className="savedMovies__name">В погоне за Бенкси</h3>
                                <img src={deleteIcon} alt="like movie" className="savedMovies__delete" />
                                <div className="savedMovies__duration">1ч 42м</div>
                            </div>
                        </>
                    }
                </section>
            </section>
        </>
    )
}
