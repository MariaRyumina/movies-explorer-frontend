import React from 'react';
import './aboutMe.css';
import imgMe from '../../images/me.png';

export default function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__title">Студент</h2>
            <div className="aboutMe__me">
                <div>
                    <p className="aboutMe__name">Мария</p>
                    <p className="aboutMe__about">Фронтенд-разработчик, 28 лет</p>
                    <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href="#" target="_blank" className="aboutMe__github-link">Github</a>
                </div>
                <img src={imgMe} alt="аватар" className="aboutMe__avatar" />
            </div>
        </section>
    )
}

