import React, { useEffect } from 'react';
import './navigation.css';
import { NavLink, Link, useLocation } from 'react-router-dom';
import profileLogoImg from '../../images/icon_user.svg';

export default function Navigation({
                                       loggedIn,
                                       widthWindow,
                                   }) {
    const [nav, setNav] = React.useState(false);
    const location = useLocation();

    return (
        <>
            { loggedIn ? (
                <nav className="navigation">
                    <button onClick={() => setNav(!nav)} className={nav ? "navigation__menu navigation__menu_active" : "navigation__menu"} />
                    <nav className={nav ? "navigation__auth navigation__auth_active" : "navigation__auth"}>
                        <div className="navigation__links-movies">
                            { widthWindow < 769 &&
                                <NavLink
                                    to="/"
                                    onClick={() => setNav(!nav)}
                                    className={ location.pathname === '/' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                                >
                                    Главная
                                </NavLink>
                            }
                            <NavLink
                                to="/movies"
                                onClick={() => setNav(!nav)}
                                className={ location.pathname === '/movies' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                            >
                                Фильмы
                            </NavLink>
                            <NavLink
                                to="/saved-movies"
                                onClick={() => setNav(!nav)}
                                className={ location.pathname === '/saved-movies' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                            >
                                Сохранённые фильмы
                            </NavLink>
                        </div>
                        <NavLink
                            to="/profile"
                            onClick={() => setNav(!nav)}
                            className="navigation__links-profile"
                        >
                            <p
                                className={ location.pathname === '/profile' ? "navigation__link-profile navigation__link-profile_active" : "navigation__link-profile" }
                            >
                                Аккаунт
                            </p>
                            <img
                                src={profileLogoImg}
                                alt="лого аккаунта"
                                className="navigation__logo-profile"
                            />
                        </NavLink>
                    </nav>
                    <div className={nav ? "navigation__background" : ""} />
                </nav>
            ) : (
                <nav className="navigation__unauth">
                    <Link to="/signup" className="navigation__signup">Регистрация</Link>
                    <Link to="/signin" className="navigation__signin">Войти</Link>
                </nav>
            ) }
        </>
    )
}
