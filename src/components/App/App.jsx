import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';
import PopupInfo from '../PopupInfo/PopupInfo';
import authYes from '../../images/auth_yes.png';
import authNo from '../../images/auth_no.png';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false); //вошёл пользователь в систему или нет
    const location = useLocation();
    const navigate = useNavigate();
    const [isPreloader, setIsPreloader] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState({ img: null, title: null });

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
    }, [loggedIn])

    //регистрация
    function handleRegistration( name, email, password ) {
        mainApi.register( name, email, password )
            .then(res => {
                if (res) {
                    handleInfoPopup(authYes, 'Вы успешно зарегистрированы');
                    handleOpenPopup();
                    handleAuthorization( email, password ) //после удачной регистрации автоматически авторизуется
                }
            })
            .catch(err => {
                handleInfoPopup(authNo, 'Что-то пошло не так! Попробуйте ещё раз.');
                handleOpenPopup();
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
                handleInfoPopup(authNo, 'Вы ввели неправильные имя или пароль');
                handleOpenPopup();
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

    //загрузка фильмов со стороннего сервера
    function getBeatFilms () {
        moviesApi.getBeatFilmCardList()
            .then(resultMovies => {
                setMovies(resultMovies)
            })
            .catch(err => console.log(`Ошибка загрузки фильмов с сервера: ${err}`))
    }

    function showPreloader () {
        setIsPreloader(true);
    }

    function hidePreloader () {
        setIsPreloader(false);
    }

    //изменение картинки и сообщения в попапе InfoPopup
    function handleInfoPopup(img, title){
        setInfoPopup({ img, title })
    }

    function handleOpenPopup () {
        setIsOpenPopup(true)
    }

    function closePopup () {
        setIsOpenPopup(false)
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
                        { !loggedIn ? (
                            <Route
                                path='/signup'
                                element={
                                    <Register
                                        onRegister={handleRegistration}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signup'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }
                        { !loggedIn ? (
                            <Route
                                path='/signin'
                                element={
                                    <Login
                                        onLogin={handleAuthorization}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signin'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }

                        <Route
                            path='/'
                            element={
                                <Main />
                            }
                        />
                        <Route
                            path='/movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    element={Movies}
                                    movies={movies}
                                    getBeatFilms={getBeatFilms}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                />
                            }
                        />
                        <Route
                            path='/saved-movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    element={SavedMovies}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                />
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    element={Profile}
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

                <PopupInfo
                    isOpen={isOpenPopup}
                    onClose={closePopup}
                    img={infoPopup.img}
                    title={infoPopup.title}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
