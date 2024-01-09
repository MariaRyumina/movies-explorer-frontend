import React from 'react';
import './savedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import movie01 from "../../images/movie01.png";
import deleteIcon from "../../images/icon_delete_movie.png";

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
                </section>
            </section>
        </>
    )
}
