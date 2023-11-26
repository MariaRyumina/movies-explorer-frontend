import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import logoImg from '../../images/logo.svg';
import profileLogoImg from '../../images/icon_user.svg';

export default function Header({  }) {
    return (
        <header className="header">
            <div className="header__links-movies">
                <img src={logoImg} alt="лого" className="header__logo" />
                <Link to="/movies" target="_blank" className="header__link">Фильмы</Link>
                <Link to="/saved-movies" target="_blank" className="header__link">Сохранённые фильмы</Link>
            </div>
            <div className="header__links-profile">
                <Link to="/profile" target="_blank" className="header__link header__link-profile">Аккаунт</Link>
                <img src={profileLogoImg} alt="лого аккаунта" className="header__profile-logo" />
            </div>
        </header>
    )
}
