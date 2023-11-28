import React from 'react';
import './aboutProject.css';

export default function AboutProject() {
    return (
        <section className="project">
            <h2 className="project__title">О проекте</h2>
            <div className="project__description">
                <div className="project__description-column">
                    <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                 <p className="project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__description-column">
                    <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__timeline">
                <div className="project__timeline-backend">
                    <p className="project__backend-time">1 неделя</p>
                    <p className="project__backend">Back-end</p>
                </div>
                <div className="project__timeline-frontend">
                    <p className="project__frontend-time">4 недели</p>
                    <p className="project__frontend">Front-end</p>
                </div>
            </div>
        </section>
    )
}

