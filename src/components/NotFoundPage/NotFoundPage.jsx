import React from "react";
import './notFoundPage.css';
import { useNavigate } from 'react-router-dom';
export default function NotFoundPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <section className="notFoundPage">
            <p className="notFoundPage__error">404</p>
            <p className="notFoundPage__text">Страница не найдена</p>
            <button onClick={goBack} className="notFoundPage__back">Назад</button>
        </section>
    )
}
