import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconError from '../../images/icon_error.png';
import { useState } from "react";

export default function SearchForm({ getBeatFilms, infoPopup, openPopup }) {
    const [valueInput, setValueInput] = useState('');

    function handleChangeInput (e) {
        setValueInput(e.target.value)
    }

    function getFilms (e) {
        e.preventDefault();

        if (valueInput !== '') {
            getBeatFilms();
        } else {
            infoPopup(iconError, 'Введите название фильма!');
            openPopup();
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
                    <button className="search__btn" onClick={getFilms}>Найти</button>
                </form>
                <FilterCheckbox />
            </div>
        </section>
    )
}
