import React from 'react';
import Footer from "../components/Footer";

const Main = () => {
    return (
        <>
            <main className="container">
                <div className="container container-sm col-10 b-main">
                    <div>
                        <p className="main_text">CrowDecrypt - сервис, где вы можете попросить помощи в расшифровке
                            рукописных документов по фотографии, а так же оказать эту помощь другим людям.</p>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Main;
