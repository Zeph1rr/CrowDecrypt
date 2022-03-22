import React from 'react';
import logo from "../assets/images/logo.png"
import {LOGIN_ROUTE} from "../utils/constants";

const Header = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
                <a href="/"
                   className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <img className="logo_image" src={logo} alt="logo" title="logo" width="100%" />
                        <span className="fs-4 logo_text">CrowDecrypt</span>
                </a>
                <ul className="nav navbar">
                    <li className="nav-item"><a href="/" className="nav-link nav-link_active"
                                                aria-current="page">Главная</a></li>
                    <li className="nav-item"><a href="/" className="nav-link">Регистрация</a></li>
                    <li className="nav-item"><a href={LOGIN_ROUTE} className="nav-link">Войти</a></li>
                </ul>
            </header>
        </div>
    );
};

export default Header;