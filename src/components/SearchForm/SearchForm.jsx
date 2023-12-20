import './searchForm.css';
import iconSearch from '../../images/icon_search.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
    return (
        <section className="search">
            <div className="search__container">
                <div className="search__form">
                    <img src={iconSearch} alt="иконка поиска" className="search__icon" />
                    <input id="movie" name="movie" type="text" placeholder="Фильм" className="search__input" />
                    <button className="search__btn">Найти</button>
                </div>
                <FilterCheckbox />
            </div>
        </section>
    )
}
