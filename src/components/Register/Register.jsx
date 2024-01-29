import React, { useEffect, useState } from 'react';
import './register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameDirty, setNameDirty] = useState(false); //проверяет, был ли курсор в input
    const [emailDirty, setEmailDirty] = useState(false); //проверяет, был ли курсор в input
    const [passwordDirty, setPasswordDirty] = useState(false); //проверяет, был ли курсор в input
    const [nameError, setNameError] = useState('Обязательное поле'); //отображает текст ошибки
    const [emailError, setEmailError] = useState('Обязательное поле'); //отображает текст ошибки
    const [passwordError, setPasswordError] = useState('Обязательное поле'); //отображает текст ошибки
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

        if (e.target.value.length < 2) {
            setNameError('Имя должно быть длиннее 2 символов');
            if (!e.target.value) {
                setNameError('Обязательное поле');
            }
        } else {
            setNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reg.test(String(e.target.value).toLowerCase())) {
            setEmailError('Введите корректный e-mail адрес');
            if (!e.target.value) {
                setEmailError('Обязательное поле');
            }
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);

        if (e.target.value.length < 4) {
            setPasswordError('Пароль должен быть длиннее 4 символов');
            if (!e.target.value) {
                setPasswordError('Обязательное поле');
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
