import React, { useEffect, useState } from 'react';
import './login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import {
    ERROR_VALIDATION_INCORRECT_EMAIL,
    ERROR_VALIDATION_INCORRECT_PASSWORD,
    ERROR_VALIDATION_REQUIRED_FIELD,
    REG_EXP_EMAIL,
} from "../../utils/constants";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false); //проверяет, был ли курсор в input
    const [passwordDirty, setPasswordDirty] = useState(false); //проверяет, был ли курсор в input
    const [emailError, setEmailError] = useState(ERROR_VALIDATION_REQUIRED_FIELD); //отображает текст ошибки
    const [passwordError, setPasswordError] = useState(ERROR_VALIDATION_REQUIRED_FIELD); //отображает текст ошибки
    const [formValid, setFormValid] = useState(false); //валидна форма или нет

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);

        if (!REG_EXP_EMAIL.test(String(e.target.value).toLowerCase())) {
            setEmailError(ERROR_VALIDATION_INCORRECT_EMAIL);
            if (!e.target.value) {
                setEmailError(ERROR_VALIDATION_REQUIRED_FIELD);
            }
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);

        if (e.target.value.length < 4) {
            setPasswordError(ERROR_VALIDATION_INCORRECT_PASSWORD);
            if (!e.target.value) {
                setPasswordError(ERROR_VALIDATION_REQUIRED_FIELD);
            }
        } else {
            setPasswordError('')
        }
    }

    //blurHandle срабатывает, когда пользователь покинул поле ввода
    const blurHandle = (e) => {
        const attributeName = e.target.name;

        if (attributeName === 'email') {
            setEmailDirty(true);
            return;
        }

        if (attributeName === 'password') {
            setPasswordDirty(true)
            return;
        }

        console.error(`не добавлено в функцию blurHandle input ${attributeName}`);
    }

    function handleSubmit(e) {
        e.preventDefault()
        onLogin( email, password );
    }

    return (
        <section className="login">
            <Link to='/' className="login__logo">
                <img src={logo} alt="лого" />
            </Link>
            <p className="login__title">Рады видеть!</p>
            <form onSubmit={handleSubmit} className="login__form" noValidate>
                <label className="login__label">
                    <span className="login__input-title">E-mail</span>
                    <input
                        value={email}
                        id="login-email"
                        type="email"
                        name="email"
                        placeholder="Введите email"
                        onBlur={e => blurHandle(e)}
                        required
                        onChange={e => emailHandler(e)}
                        className="login__input login__input_value_email"
                    />
                    {(emailDirty && emailError) &&
                        <span id="email-error" className="login__input-error">{emailError}</span>
                    }
                </label>
                <label className="login__label">
                    <span className="login__input-title">Пароль</span>
                    <input
                        value={password}
                        id="login-password"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        onBlur={e => blurHandle(e)}
                        required
                        onChange={e => passwordHandler(e)}
                        className="login__input login__input_value_password"
                    />
                    {(passwordDirty && passwordError) &&
                        <span id="password-error" className="login__input-error">{passwordError}</span>
                    }
                </label>

                <button disabled={!formValid} type="submit" className="login__button">Войти</button>
                <p className="login__subtitle">Ещё не зарегистрированы?
                    <Link to='/signup' className="login__subtitle-link">Регистрация</Link>
                </p>
            </form>
        </section>
    )
}
