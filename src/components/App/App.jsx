import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from "../Preloader/Preloader";

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false); //вошёл пользователь в систему или нет
    const location = useLocation();
    const navigate = useNavigate();
    const [isPreloader, setIsPreloader] = useState(false);

    //проверка токена на валидность
    React.useEffect(() => {
        const token = localStorage.getItem('jwt');

        if(token) {
            mainApi.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch(err => {
                    localStorage.removeItem('jwt');
                    console.log(`Ошибка запроса проверки токена: ${err}`);
                })
        }
    }, [navigate])

    //регистрация
    function handleRegistration( name, email, password ) {
        mainApi.register( name, email, password )
            .then(res => {
                if (res) {
                    handleAuthorization( email, password ) //после удачной регистрации автоматически авторизуется
                }
            })
            .catch(err => {
                console.error(`Ошибка регистрации: ${err}`);
            })
    }

    //авторизация
    function handleAuthorization( email, password ) {
        mainApi.login( email, password )
            .then(res => {
                if(res) {
                    setLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch(err => {
                console.error(`Ошибка авторизации: ${err}`);
            })
    }

    //загрузка информации о пользователе с сервера
    React.useEffect(() => {
        if(loggedIn) {
            mainApi.getUserInfo()
                .then(resultUser => {
                    setCurrentUser(resultUser)
                })
                .catch(err => console.log(`Ошибка загрузки с сервера: ${err}`))
        }
    }, [loggedIn])

    //загрузка информации о пользователе на сервер
    function handleUpdateUser ({ name, email }) {
        mainApi.updateUserInfo({ name, email })
            .then(resultUser => {
                setCurrentUser(resultUser)
            })
            .catch(err => console.log(`Ошибка отправки данных о пользователе на сервер: ${err}`))
    }

    function showPreloader() {
        setIsPreloader(true);
    }

    function hidePreloader() {
        setIsPreloader(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="content">
                { ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname)
                    && <Header
                        loggedIn={loggedIn}
                    />
                }
                <div className="main">
                    <Routes>
                        <Route
                            path='/*'
                            element={
                                <NotFoundPage />
                            }
                        />
                        <Route
                            path='/signup'
                            element={
                                <Register
                                    onRegister={handleRegistration}
                                />
                            }
                        />
                        <Route
                            path='/signin'
                            element={
                                <Login
                                    onLogin={handleAuthorization}
                                />
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
                            element={ <ProtectedRoute
                                element={Movies}
                                loggedIn={loggedIn}
                            />}
                        />
                        <Route
                            path='/saved-movies'
                            element={
                                <ProtectedRoute
                                    element={SavedMovies}
                                    loggedIn={loggedIn}
                                />
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <ProtectedRoute
                                    element={Profile}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    onUpdateUser={handleUpdateUser}
                                />
                            }
                        />
                    </Routes>
                </div>
                { (location.pathname === '/' ||
                        location.pathname === '/movies' ||
                        location.pathname === '/saved-movies')
                    && <Footer />
                }

                <Preloader
                    isOpen={isPreloader}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
