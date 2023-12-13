import React from 'react';
import './register.css';
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <section className="register">
            <Link to='/' className="register__logo">
                <img src={logo} alt="лого" />
            </Link>
            <p className="register__title">Добро пожаловать!</p>
            <form className="register__form" noValidate>
                <label className="register__label">
                    <span className="register__input-title">Имя</span>
                    <input id="register-name" type="text" name="name" required
                           className="register__input register__input_value_name" />
                    <span id="email-error" className="register__input-error" />
                </label>
                <label className="register__label">
                    <span className="register__input-title">E-mail</span>
                    <input id="register-email" type="email" name="email" required
                           className="register__input register__input_value_email" />
                    <span id="email-error" className="register__input-error" />
                </label>
                <label className="register__label">
                    <span className="register__input-title">Пароль</span>
                    <input id="register-password" type="password" name="password" required
                           className="register__input register__input_value_password" />
                    <span id="password-error" className="register__input-error" />
                </label>

                <button type="submit" className="register__button">Зарегистрироваться</button>
                <p className="register__subtitle">Уже зарегистрированы?
                    <Link to='/signin' className="register__subtitle-link">Войти</Link>
                </p>
            </form>
        </section>
    )
}

