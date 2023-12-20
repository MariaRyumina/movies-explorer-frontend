import './filterCheckbox.css';

export default function FilterCheckbox() {
    return (
        <div className="filter-checkbox">
            <label className="checkbox">
                <input type="checkbox" className="checkbox__input" id="checkbox" />
                <span className="checkbox__span">Короткометражки</span>
            </label>
        </div>
    )
}
