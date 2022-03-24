import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Header from "./Header";
import Footer from "./Footer";
import Main from "../pages/Main";
import {useSelector} from "react-redux";
import {MAIN_ROUTE} from "../utils/constants";

const AppRouter = () => {
    const {isAuth} = useSelector(state => state)
    return (
        <>
            <Header/>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact/>
                )}
                <Route path={MAIN_ROUTE} element={<Main/>} exact/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
            <Footer/>
        </>
    );
};

export default AppRouter;