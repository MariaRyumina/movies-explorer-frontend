import './filterCheckbox.css';

export default function FilterCheckbox({
                                           moviesFiltration,
                                           setMovies,
                                           movies,
                                       }) {
    function handleChangeCheckbox (e) {
        localStorage.setItem("isShortMovies", e.target.checked)
        moviesFiltration(movies, setMovies);
    }

    return (
        <div className="filter-checkbox">
            <label className="checkbox">
                <input
                    checked={localStorage.getItem("isShortMovies") === "true"}
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
