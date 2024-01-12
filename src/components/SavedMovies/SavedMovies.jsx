import React from 'react';
import './savedMovies.css';
import SearchForm from "../SearchForm/SearchForm";

export default function SavedMovies({ infoPopup, openPopup }) {
    return (
        <>
            <SearchForm
                infoPopup={infoPopup}
                openPopup={openPopup}
            />
        </>
    )
}
