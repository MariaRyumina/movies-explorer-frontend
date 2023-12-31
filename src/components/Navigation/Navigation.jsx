import React from 'react';
import './navigation.css';
import { Link, useLocation } from 'react-router-dom';
import profileLogoImg from '../../images/icon_user.svg';

export default function Navigation() {
    const [loggedIn, setLoggedIn] = React.useState(true); //вошёл пользователь в систему или нет
    const [width, setWidth] = React.useState(window.innerWidth);
    const [nav, setNav] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleResize = (evt) => setWidth(evt.target.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <>
            {loggedIn ? (
                <nav className="navigation">
                    <button onClick={() => setNav(!nav)} className={nav ? "navigation__menu_active" : "navigation__menu"} />
                    <nav className={nav ? "navigation__auth_active" : "navigation__auth"}>
                        <div className="navigation__links-movies">
                            { width < 769 &&
                                <Link
                                    to="/"
                                    onClick={() => setNav(!nav)}
                                    className={ location.pathname === '/' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                                >
                                    Главная
                                </Link>
                            }
                            <Link
                                to="/movies"
                                onClick={() => setNav(!nav)}
                                className={ location.pathname === '/movies' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                            >
                                Фильмы
                            </Link>
                            <Link
                                to="/saved-movies"
                                onClick={() => setNav(!nav)}
                                className={ location.pathname === '/saved-movies' ? "navigation__link-movies navigation__link-movies_active" : "navigation__link-movies" }
                            >
                                Сохранённые фильмы
                            </Link>
                        </div>
                        <Link
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
                        </Link>
                    </nav>
                    <div className={nav ? "navigation__background" : ""} />
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
