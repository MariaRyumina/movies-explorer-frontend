import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х Maria.</p>
            <div className="footer__info">
                <p className="footer__copyright">&copy; 2023</p>
                <nav className="footer__links">
                    <a href="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</a>
                    <a href="https://github.com/" target="_blank" className="footer__link">Github</a>
                </nav>
            </div>
        </footer>
    )
}
