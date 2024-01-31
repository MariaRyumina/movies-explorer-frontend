import React, { useContext, useEffect, useState } from "react";
import './profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";
import iconOk from "../../images/icon_ok.png";
import {
    ERROR_VALIDATION_INCORRECT_EMAIL,
    ERROR_VALIDATION_INCORRECT_NAME,
    ERROR_VALIDATION_REQUIRED_FIELD,
    REG_EXP_EMAIL,
    SUCCESSFUL_UPDATE_USER_INFORMATION,
    VALID_NAME_LENGTH,
} from "../../utils/constants";

export default function Profile({
                                    onUpdateUser,
                                    onLogout,
                                    infoPopup,
                                    openPopup,
                                }) {
    const [showEditBtn, setShowEditBtn] = useState(true);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [emailDirty, setEmailDirty] = useState(false); //проверяет, был ли курсор в input
    const [nameDirty, setNameDirty] = useState(false); //проверяет, был ли курсор в input
    const [emailError, setEmailError] = useState(''); //отображает текст ошибки
    const [nameError, setNameError] = useState(''); //отображает текст ошибки
    const [formValid, setFormValid] = useState(false); //валидна форма или нет

    useEffect(() => {
        setName(currentUser.name)
        setEmail(currentUser.email)
    }, [setName, currentUser.name, setEmail, currentUser.email]);

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateUser({ name, email })
        infoPopup(iconOk, SUCCESSFUL_UPDATE_USER_INFORMATION);
        openPopup();
    }

    function handleEdit () {
        setShowEditBtn(false);
        setShowSaveBtn(true);
    }

    function handleSave () {
        setShowSaveBtn(false);
        setShowEditBtn(true);
    }

    //валидация
    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])

    function handleChangeName (e) {
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

    function handleChangeEmail (e) {
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

    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            default:
                console.error('для поля не добавлен эффект blur')
        }
    }

    return (
        <section className="profile">
            <p className="profile__title">Привет, {name}!</p>
            <form onSubmit={handleSubmit} className="profile__form" noValidate>
                <label className="profile__label profile__label-name">
                    <div className="profile__input-name">
                        <span className="profile__input-title">Имя</span>
                        <input
                            value={name}
                            onChange={handleChangeName}
                            id="register-name"
                            type="text"
                            name="name"
                            placeholder="Введите имя"
                            onBlur={e => blurHandle(e)}
                            disabled={ showSaveBtn ? false : true }
                            required
                            className="profile__input profile__input_value_name"
                        />
                    </div>
                    {(nameDirty && nameError) &&
                        <span id="name-error" className="profile__input-error">{nameError}</span>
                    }
                </label>
                <label className="profile__label profile__label-email">
                    <div className="profile__input-email">
                        <span className="profile__input-title">E-mail</span>
                        <input
                            value={email}
                            onChange={handleChangeEmail}
                            id="register-email"
                            type="email"
                            name="email"
                            placeholder="Введите почту"
                            onBlur={e => blurHandle(e)}
                            disabled={ showSaveBtn ? false : true }
                            required
                            className="profile__input profile__input_value_email"
                        />
                    </div>
                    {(emailDirty && emailError) &&
                        <span id="email-error" className="profile__input-error">{emailError}</span>
                    }
                </label>
                <div className={ showEditBtn ? "profile__edit" : "profile__edit profile__edit_hidden" }>
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="profile__btn-edit"
                    >
                        Редактировать
                    </button>
                    <Link
                        to='/'
                        onClick={onLogout}
                        className="profile__signout"
                    >
                        Выйти из аккаунта
                    </Link>
                </div>

                <button
                    disabled={!formValid}
                    type="submit"
                    onClick={handleSave}
                    className={ showSaveBtn ? "profile__btn-save" : "profile__btn-save profile__btn-save_hidden"}
                >
                    Сохранить
                </button>
            </form>
        </section>
    )
}
