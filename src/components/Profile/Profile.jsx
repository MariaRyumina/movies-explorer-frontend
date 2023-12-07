import React from "react";
import './profile.css';

export default function Profile() {
    return (
        <section className="profile">
            <p className="profile__title">Привет, Виталий!</p>
            <form className="profile__form" noValidate>
                <label className="profile__label profile__label-name">
                    <div className="profile__input-name">
                        <span className="profile__input-title">Имя</span>
                        <input id="register-name" type="text" name="name" placeholder="Виталий" disabled
                               required className="profile__input profile__input_value_name" />
                    </div>
                    <span id="email-error" className="profile__input-error" />
                </label>
                <label className="profile__label profile__label-email">
                    <div className="profile__input-email">
                        <span className="profile__input-title">E-mail</span>
                        <input id="register-email" type="email" name="email" placeholder="pochta@yandex.ru" disabled
                               required className="profile__input profile__input_value_email" />
                    </div>
                    <span id="email-error" className="profile__input-error" />
                </label>
            </form>
            <button type="submit" className="profile__edit">Редактировать</button>
            <button type="submit" className="profile__signout">Выйти из аккаунта</button>
        </section>
    )
}
