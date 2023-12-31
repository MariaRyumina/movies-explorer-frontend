import React, { useEffect, useState } from 'react';
import './login.css';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Поле "E-mail" должно быть заполнено!');
    const [passwordError, setPasswordError] = useState('Поле "Пароль" должно быть заполнено!');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(String(e.target.value).toLowerCase())) {
            setEmailError('Поле "E-mail" имеет неправильный формат');
            if (!e.target.value) {
                setEmailError('Поле "E-mail" должно быть заполнено!');
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
                setPasswordError('Поле "Пароль" должно быть заполнено!');
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return (
        <section className="login">
            <Link to='/' className="login__logo">
                <img src={logo} alt="лого" />
            </Link>
            <p className="login__title">Рады видеть!</p>
            <form className="login__form" noValidate>
                <label className="login__label">
                    <span className="login__input-title">E-mail</span>
                    <input
                        value={email}
                        id="login-email"
                        type="email"
                        name="email"
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
