import React from "react";
import './notFoundPage.css';

export default function NotFoundPage() {
    return (
        <section className="notFoundPage">
            <p className="notFoundPage__error">404</p>
            <p className="notFoundPage__text">Страница не найдена</p>
            <p className="notFoundPage__back">Назад</p>
        </section>
    )
}