import React from 'react';
import logo from "../assets/images/logo.jpg"
import {useDispatch, useSelector} from "react-redux";
import {authNavbar, publicNavbar} from "../routes";
import {Link} from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch()
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('Token')
        dispatch({type: 'LOGOUT', payload: {}})
    }

    const {isAuth} = useSelector(state => state)
    return (
        <>
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
                <Link
                    to="/"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                    <img className="logo_image" src={logo} alt="logo" title="logo" width="100%" />
                        <span className="fs-4 logo_text">CrowDecrypt</span>
                </Link>
                <ul className="nav navbar">
                    <li className="nav-item"><Link to="/" className="nav-link"
                                                aria-current="page">Главная</Link></li>
                    {isAuth && authNavbar.map((nav) =>
                        <li key={nav.link} className="nav-item">
                            <Link to={nav.link} className="nav-link">{nav.name}</Link>
                        </li>
                    )}
                    {isAuth && <li className="nav-item">
                        <Link to="#" onClick={e => logout(e)} className="nav-link">Выйти</Link>
                    </li>}
                    {!isAuth && publicNavbar.map( (nav) =>
                        <li key={nav.link} className="nav-item"><Link to={nav.link} className="nav-link">{nav.name}</Link></li>
                    )}
                </ul>
            </header>
        </>
    );
};

export default Header;
