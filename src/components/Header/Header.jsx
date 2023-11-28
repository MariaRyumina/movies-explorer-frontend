import React from 'react';
import './header.css';
import logoImg from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <Link to='/' className="header__logo">
                <img src={logoImg} alt="лого" />
            </Link>
            <Navigation />
        </header>
    )
}
