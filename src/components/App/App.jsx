import React from 'react';
import { Route, Routes } from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from "../Movies/Movies";

function App() {
    return (
        <div className="page">
            <Header />

            <Routes>
                <Route
                    path='/'
                    element={
                        <Main />
                    }
                />
                <Route
                    path='/movies'
                    element={
                        <Movies />
                    }
                />
            </Routes>

            <Footer />
        </div>
    )
}

export default App;
