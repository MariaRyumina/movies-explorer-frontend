import React from 'react';
import { useLocation } from "react-router-dom";
import './moviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList() {
    const location = useLocation();

    return (
        <section className="moviesCardList">
            <MoviesCard />
            {location.pathname === '/movies' && <button className="moviesCardList__more">Ещё</button>}
        </section>
    )
}
