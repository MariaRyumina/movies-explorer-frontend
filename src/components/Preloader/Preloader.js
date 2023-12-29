import React from 'react';
import './preloader.css';

const Preloader = ({ isOpen }) => {
    return (
        <div className={`preloader ${!isOpen ? "preloader__hidden" : ""}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
