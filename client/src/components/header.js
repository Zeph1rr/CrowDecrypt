import React from 'react';
import logo from "../assets/images/logo.png"

const Header = () => {
    return (
        <header className={"header"}>
            <div className="logo">
                <img className="logo_image" src={logo} alt="logo" title="logo" />
                <h1 className="logo_text">CrowDecrypt</h1>
            </div>
            <nav>
                <ul className="navbar">
                    <li><a href="/" className="nav-link nav-link_active">Главная</a></li>
                    <li><a href="#" className="nav-link">Регистрация</a></li>
                    <li><a href="#" className="nav-link">Войти</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;