import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ getFilms }) {
    return (
        <section className="search">
            <div className="search__container">
                <div className="search__form">
                    <img src={iconSearch} alt="иконка поиска" className="search__icon" />
                    <input id="movie" name="movie" type="text" placeholder="Поиск фильма" className="search__input" />
                    <button className="search__btn" onClick={getFilms}>Найти</button>
                </div>
                <FilterCheckbox />
            </div>
        </section>
    )
}
