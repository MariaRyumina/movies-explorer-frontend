import './filterCheckbox.css';

export default function FilterCheckbox({
                                           isShortMovies,
                                           setIsShortMovies,
                                           getBeatFilms,
                                       }) {
    function handleChangeCheckbox () {
        setIsShortMovies(!isShortMovies);
        getBeatFilms();
    }

    return (
        <div className="filter-checkbox">
            <label className="checkbox">
                <input
                    checked={isShortMovies}
                    onChange={handleChangeCheckbox}
                    type="checkbox"
                    className="checkbox__input"
                    id="checkbox"
                />
                <span className="checkbox__span">Короткометражки</span>
            </label>
        </div>
    )
}
