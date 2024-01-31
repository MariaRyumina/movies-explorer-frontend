import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from "react";
import iconError from "../../images/icon_error.png";
import {ERROR_VALIDATION_REQUIRED_NAME} from "../../utils/constants";

export default function SearchForm({
                                       valueInput,
                                       setValueInput,
                                       isShortMovies,
                                       setIsShortMovies,
                                       infoPopup,
                                       openPopup,
                                       searchMovies,
                                   }) {
    function handleChangeInput(e) {
        setValueInput(e.target.value);
    }

    function handleSearch (e) {
        e.preventDefault();

        if (valueInput === "") {
            infoPopup(iconError, ERROR_VALIDATION_REQUIRED_NAME);
            openPopup();
        } else {
            searchMovies(valueInput);
        }
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
                        onClick={handleSearch}
                    >
                        Найти
                    </button>
                </form>
                <FilterCheckbox
                    isShortMovies={isShortMovies}
                    setIsShortMovies={setIsShortMovies}
                />
            </div>
        </section>
    )
}
