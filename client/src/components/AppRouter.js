import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Header from "./Header";
import Footer from "./Footer";

const AppRouter = () => {
    const isAuth = false
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