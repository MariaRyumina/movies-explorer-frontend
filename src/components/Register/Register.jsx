import React, { useEffect, useState } from 'react';
import './register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import {
    ERROR_VALIDATION_INCORRECT_EMAIL,
    ERROR_VALIDATION_INCORRECT_NAME,
    ERROR_VALIDATION_INCORRECT_PASSWORD,
    ERROR_VALIDATION_REQUIRED_FIELD,
    REG_EXP_EMAIL,
    VALID_NAME_LENGTH,
    VALID_PASSWORD_LENGTH,
} from "../../utils/constants";

export default function Register({ onRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameDirty, setNameDirty] = useState(false); //проверяет, был ли курсор в input
    const [emailDirty, setEmailDirty] = useState(false); //проверяет, был ли курсор в input
    const [passwordDirty, setPasswordDirty] = useState(false); //проверяет, был ли курсор в input
    const [nameError, setNameError] = useState(ERROR_VALIDATION_REQUIRED_FIELD); //отображает текст ошибки
    const [emailError, setEmailError] = useState(ERROR_VALIDATION_REQUIRED_FIELD); //отображает текст ошибки
    const [passwordError, setPasswordError] = useState(ERROR_VALIDATION_REQUIRED_FIELD); //отображает текст ошибки
    const [formValid, setFormValid] = useState(false); //валидна форма или нет

    useEffect(() => {
        if (nameError || emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, passwordError])

    const nameHandler = (e) => {
        setName(e.target.value);

        if (e.target.value.length < VALID_NAME_LENGTH) {
            setNameError(ERROR_VALIDATION_INCORRECT_NAME);
            if (!e.target.value) {
                setNameError(ERROR_VALIDATION_REQUIRED_FIELD);
            }
        } else {
            setNameError('')
        }
    }

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

        if (e.target.value.length < VALID_PASSWORD_LENGTH) {
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

        if (attributeName === 'name') {
            setNameDirty(true);
            return;
        }

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
        onRegister( name, email, password );
    }

    return (
        <section className="register">
            <Link to='/' className="register__logo">
                <img src={logo} alt="лого" />
            </Link>
            <p className="register__title">Добро пожаловать!</p>
            <form onSubmit={handleSubmit} className="register__form" noValidate>
                <label className="register__label">
                    <span className="register__input-title">Имя</span>
                    <input
                        value={name}
                        id="register-name"
                        type="text"
                        name="name"
                        placeholder="Введите имя"
                        onBlur={blurHandle}
                        required
                        onChange={nameHandler}
                        className="register__input register__input_value_name"
                    />
                    {(nameDirty && nameError) &&
                        <span id="email-error" className="register__input-error">{nameError}</span>
                    }
                </label>
                <label className="register__label">
                    <span className="register__input-title">E-mail</span>
                    <input
                        value={email}
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="Введите email"
                        onBlur={blurHandle}
                        required
                        onChange={emailHandler}
                        className="register__input register__input_value_email"
                    />
                    {(emailDirty && emailError) &&
                        <span id="email-error" className="register__input-error">{emailError}</span>
                    }
                </label>
                <label className="register__label">
                    <span className="register__input-title">Пароль</span>
                    <input
                        value={password}
                        id="register-password"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        onBlur={blurHandle}
                        required
                        onChange={passwordHandler}
                        className="register__input register__input_value_password"
                    />
                    {(passwordDirty && passwordError) &&
                        <span id="password-error" className="register__input-error">{passwordError}</span>
                    }
                </label>

                <button disabled={!formValid} type="submit" className="register__button">Зарегистрироваться</button>
                <p className="register__subtitle">Уже зарегистрированы?
                    <Link to='/signin' className="register__subtitle-link">Войти</Link>
                </p>
            </form>
        </section>
    )
}
