import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import iconError from '../../images/icon_error.png';
import { useEffect } from "react";

export default function SearchForm({
                                       valueInput,
                                       setValueInput,
                                       getBeatFilms,
                                       infoPopup,
                                       openPopup,
                                       movies,
                                       isShortMovies,
                                       setIsShortMovies,
                                   }) {
    function handleChangeInput (e) {
        setValueInput(e.target.value)
    }

    function getFilms (e) {
        e.preventDefault();

        if (movies.length === 0 && valueInput !== '') {
            getBeatFilms();
        } else if (movies.length !== 0 && valueInput !== '') {
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
                <FilterCheckbox
                    isShortMovies={isShortMovies}
                    setIsShortMovies={setIsShortMovies}
                    getBeatFilms={getBeatFilms}
                />
            </div>
        </section>
    )
}
