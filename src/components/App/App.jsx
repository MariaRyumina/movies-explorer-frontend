import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
    const location = useLocation();

    return (
        <div className="page">

            { ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname)
                && <Header />
            }

            <Routes>
                <Route
                    path='/*'
                    element={
                        <NotFoundPage />
                    }
                />
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
                <Route
                    path='/saved-movies'
                    element={
                        <SavedMovies />
                    }
                />
                <Route
                    path='/signin'
                    element={
                        <Login />
                    }
                />
                <Route
                    path='/signup'
                    element={
                        <Register />
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <Profile />
                    }
                />
            </Routes>

            { (location.pathname === '/' ||
                    location.pathname === '/movies' ||
                    location.pathname === '/saved-movies')
                && <Footer />
            }
        </div>
    )
}

export default App;
