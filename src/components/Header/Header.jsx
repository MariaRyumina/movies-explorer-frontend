import React from 'react';
import { useLocation } from "react-router-dom";
import './header.css';
import logoImg from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <header className={ location.pathname === '/' ? "header header_blue" : "header" }>
            <Link to='/' className="logo__header">
                <img src={logoImg} alt="лого" />
            </Link>
            <Navigation />
        </header>
    )
}
