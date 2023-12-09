import React from 'react';
import './promo.css';
import promoLogo from '../../images/promo_logo.png';

export default function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img src={promoLogo} alt="лого" className="promo__logo" />
        </section>
    )
}

