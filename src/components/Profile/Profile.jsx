import React, {useContext, useEffect, useState} from "react";
import './profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";
import iconOK from "../../images/icon_ok.png";

export default function Profile({
                                    setLoggedIn,
                                    onUpdateUser,
                                    onLogout,
                                }) {
    const [showEditBtn, setShowEditBtn] = useState(true);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailError, setEmailError] = useState('Обязательное поле');
    const [nameError, setNameError] = useState('Обязательное поле');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setName(currentUser.name)
        setEmail(currentUser.email)
    }, [setName, currentUser.name, setEmail, currentUser.email]);

    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])

    function handleEdit () {
        setShowEditBtn(false);
        setShowSaveBtn(true);
    }

    function handleSave () {
        setShowSaveBtn(false);
        setShowEditBtn(true);
    }

    function handleChangeName (e) {
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

    function handleChangeEmail (e) {
        setEmail(e.target.value);

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reg.test(String(e.target.value).toLowerCase())) {
            setEmailError('Введите корректный e-mail адрес');
            if (!e.target.value) {
                setEmailError('Обязательное поле');
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
        }
    }

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateUser({ name, email })
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
