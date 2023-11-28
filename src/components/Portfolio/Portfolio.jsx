import React from 'react';
import './portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <a href="https://github.com/MariaRyumina/how-to-learn" target="_blank" className="portfolio__link">
                <p className="portfolio__paragraph">Статичный сайт</p>
                <p className="portfolio__paragraph">↗</p>
            </a>
            <a href="https://github.com/MariaRyumina/russian-travel" target="_blank" className="portfolio__link">
                <p className="portfolio__paragraph">Адаптивный сайт</p>
                <p className="portfolio__paragraph">↗</p>
            </a>
            <a href="https://github.com/MariaRyumina/russian-travel" target="_blank" className="portfolio__link">
                <p className="portfolio__paragraph">Одностраничное приложение</p>
                <p className="portfolio__paragraph">↗</p>
            </a>
        </section>
    )
}
