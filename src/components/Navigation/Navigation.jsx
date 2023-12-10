import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';
import profileLogoImg from '../../images/icon_user.svg';

export default function Navigation() {
    const [loggedIn, setLoggedIn] = React.useState(true); //вошёл пользователь в систему или нет

    return (
        <>
            {loggedIn ? (
                <nav className="navigation__auth">
                    <div className="navigation__links-movies">
                        <Link to="/movies" className="navigation__link-movies">Фильмы</Link>
                        <Link to="/saved-movies" className="navigation__link-movies">Сохранённые фильмы</Link>
                    </div>
                    <Link to="/profile" className="navigation__links-profile">
                        <p className="navigation__link-profile">Аккаунт</p>
                        <img
                            src={profileLogoImg}
                            alt="лого аккаунта"
                            className="navigation__logo-profile"
                        />
                    </Link>
                </nav>
            ) : (
                <nav className="navigation__unauth">
                    <Link to="/signup" className="navigation__signup">Регистрация</Link>
                    <Link to="/signin" className="navigation__signin">Войти</Link>
                </nav>
            )}
        </>
    )
}
