import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React, { useEffect, useState } from "react";
import iconError from "../../images/icon_error.png";
import { ERROR_VALIDATION_REQUIRED_NAME } from "../../utils/constants";

export default function SearchForm({
                                       valueInput,
                                       setValueInput,
                                       isShortMovies,
                                       setIsShortMovies,
                                       infoPopup,
                                       openPopup,
                                   }) {
    const [input, setInput] = useState("");

    useEffect(() =>{
        setInput(valueInput);
    },[valueInput])

    function handleChangeInput(e) {
        setInput(e.target.value);
    }

    function handleSearch (e) {
        if(e) e.preventDefault();

        if (input === "") {
            infoPopup(iconError, ERROR_VALIDATION_REQUIRED_NAME);
            openPopup();
        } else {
            setValueInput(input);
        }
    }

    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <img src={iconSearch} alt="иконка поиска" className="search__icon" />
                    <input
                        onChange={handleChangeInput}
                        value={input}
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
                    onSearch={handleSearch}
                />
            </div>
        </section>
    )
}
