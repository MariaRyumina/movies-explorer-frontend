import React, {useContext, useState} from "react";
import './profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {Link} from "react-router-dom";

export default function Profile({ setLoggedIn, onUpdateUser }) {
    const [showEditBtn, setShowEditBtn] = useState(true);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    function handleEdit () {
        setShowEditBtn(false);
        setShowSaveBtn(true);
    }

    function handleSave () {
        setShowSaveBtn(false);
        setShowEditBtn(true);
    }

    function handleChangeName (e) {
        setName(e.target.value)
    }

    function handleChangeEmail (e) {
        setEmail(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateUser({ name, email })
    }

    //выход из аккаунта
    function logout () {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
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
                            disabled={ showSaveBtn ? false : true }
                            required
                            className="profile__input profile__input_value_name" />
                    </div>
                    <span id="email-error" className="profile__input-error" />
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
                            disabled={ showSaveBtn ? false : true }
                            required
                            className="profile__input profile__input_value_email" />
                    </div>
                    <span id="email-error" className="profile__input-error" />
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
                        onClick={logout}
                        className="profile__signout"
                    >
                        Выйти из аккаунта
                    </Link>
                </div>

                <button
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
