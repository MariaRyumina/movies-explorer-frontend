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
                    <p className="aboutMe__description">
                        Я родилась на Дальнем Востоке в Хабаровске, где выучилась на инженера-строителя.
                        Сейчас учусь на веб-разработчика.
                        Люблю слушать музыку, танцевать, спорт, мотоциклы и шить. Главное в жизни - саморазвитие.
                    </p>
                    <a href="https://github.com/MariaRyumina" rel="noopener noreferrer" className="aboutMe__github-link">Github</a>
                </div>
                <img src={imgMe} alt="аватар" className="aboutMe__avatar" />
            </div>
        </section>
    )
}
