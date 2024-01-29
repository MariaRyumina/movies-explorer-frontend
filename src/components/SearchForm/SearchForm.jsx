import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from "react";

export default function SearchForm({
                                       valueInput,
                                       setValueInput,
                                       searchMovies,
                                       moviesFiltration,
                                       setMovies,
                                       movies,
                                   }) {
    function handleChangeInput (e) {
        setValueInput(e.target.value)
    }

    function getFilms (e) {
        e.preventDefault();
        searchMovies();
    }

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <img src={iconSearch} alt="иконка поиска" className="search__icon" />
                    <input
                        onChange={handleChangeInput}
                        value={valueInput}
                        id="movie"
                        name="movie"
                        type="text"
                        placeholder="Поиск фильма"
                        className="search__input"
                    />
                    <button
                        className="search__btn"
                        onClick={getFilms}
                    >
                        Найти
                    </button>
                </form>
                <FilterCheckbox
                    moviesFiltration={moviesFiltration}
                    setMovies={setMovies}
                    movies={movies}
                />
            </div>
        </section>
    )
}
