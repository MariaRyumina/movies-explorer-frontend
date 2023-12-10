import React from 'react';
import './login.css';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <section className="login">
            <img src={logo} className="login__logo" />
            <p className="login__title">Рады видеть!</p>
            <form className="login__form" noValidate>
                <label className="login__label">
                    <span className="login__input-title">E-mail</span>
                    <input id="login-email" type="email" name="email" required
                           className="login__input login__input_value_email" />
                    <span id="email-error" className="login__input-error" />
                </label>
                <label className="login__label">
                    <span className="login__input-title">Пароль</span>
                    <input id="login-password" type="password" name="password" required
                           className="login__input login__input_value_password" />
                    <span id="password-error" className="login__input-error" />
                </label>

                <button type="submit" className="login__button">Войти</button>
                <p className="login__subtitle">Ещё не зарегистрированы?
                    <Link to='/signup' className="login__subtitle-link">Регистрация</Link>
                </p>
            </form>
        </section>
    )
}
